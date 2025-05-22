import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation } from "@tanstack/react-query";
import {
  updateNote,
  refreshUserToken,
  uploadContentImg,
  promptAi
} from "../services/apiCalls";
import { updateStoreNote } from "../slices/userSlice";
import { isLoggedIn } from "../slices/loginSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import CollaborateChatRoom from "./CollaborateChatRoom";
import { initSocket } from "../services/socket";
import chatbotAiImg from '../assets/icons and logos/chatbotAiImg.svg'
import { setJoinedRoom } from "../slices/roomJoinSlice";
import cross from "../assets/icons and logos/cross.svg";
import send from "../assets/icons and logos/send.svg";
import { setTodos,setTodoCompletion,deleteStoreTodo } from "../slices/userSlice.js"
import chatGif from "../assets/illustrations/chatGif.gif"
import aiLoading from '../assets/illustrations/aiLoading.gif'
import Chat from "../assets/icons and logos/chat.svg"
const NoteEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");
  const [roomName, setRoomName] = useState("");
  const aiButtonRef=useRef()
  const notes = useSelector((state) => state.user.notes);
  const { noteId } = useParams();
  const note = notes.filter((n) => n._id == noteId)[0];
  const [content, setContent] = useState(note.content);
  const [openChat,setOpenChat]=useState(false)
  const userFullName=useSelector(state=>state.user.fullname)
  const joinedRoom = useSelector((state) => state.joinedRoom.joinedRoom);
  const fcmToken=useSelector((state)=>state.user.fcmToken)
  const [showAiBox,setShowAiBox]=useState(false)
  const [prompt,setPrompt]=useState("")
  const socketRef = useRef(null)
  
  const { mutate: editNote, isPending: saving } = useMutation({
    mutationFn: async ({ id, content }) => {
      return await updateNote({ id, content });
    },
    onSuccess: (response) => {
      dispatch(
        updateStoreNote({
          id: response.data.id,
          content: response.data.content,
        })
      );
    },
    onError: async (error, id, content) => {
      if (error.status === 401) {
        await refreshUserToken();
        try {
          editNote({ id, content });
        } catch (error) {
          dispatch(isLoggedIn(false));
          navigate("/login");
          toast.error("User Logged Out!");
        }
      } else {
        toast.error(`${error.response.data.message}`);
      }
    },
  });

  const { mutate: uploadTinyMCEImage } = useMutation({
    mutationFn: async (formData) => {
      const response = await uploadContentImg(formData);
      return response;
    },
  });

  const handleEditorChange = (content) => {
    editNote({ id: note._id, content });
  };
  const handleImageUpload = (blobInfo, progress) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("tinyMCEImg", blobInfo.blob(), blobInfo.filename());

      uploadTinyMCEImage(formData, {
        onSuccess: (response) => {
          resolve(response.data.url);
        },
        onError: async (error) => {
          
          if (error.status === 401) {
            await refreshUserToken();
            try {
              handleImageUpload(blobInfo, progress);
            } catch (error) {
              dispatch(isLoggedIn(false));
              navigate("/login");
              toast.error("User Logged Out!");
            }
          }
          reject({ message: "Image upload failed", remove: true });
          
        },
      });
    });
  };

  const {mutate:promptAiMutation,isPending:aiPromptPending}=useMutation({
    mutationFn:async({message,fcmToken})=>{
        return await promptAi(message,fcmToken)
    },
    onSuccess:(response)=>{
      if(response.status===200 && response.data.message && !response.data.functionsReturnObj){
        
       recievePrompt(response.data.message)
      }
      if(response.status===200 && response.data.functionsReturnObj){
       
        if(response.data.functionsReturnObj.functionName==='create_todo'){
          if(response.data.functionsReturnObj.message && response.data.functionsReturnObj.todo  && response.data.functionsReturnObj.errorMsg===''){
            dispatch(setTodos(response.data.functionsReturnObj.todo))
           recievePrompt(response.data.functionsReturnObj.message)
          }
          if(response.data.functionsReturnObj.errorMsg && response.data.functionsReturnObj.message==='' && !response.data.functionsReturnObj.todo){
            recievePrompt(response.data.functionsReturnObj.errorMsg)
          }
        }
        if(response.data.functionsReturnObj.functionName==='delete_todo'){
          if(response.data.functionsReturnObj.message && response.data.functionsReturnObj.todoId  && response.data.functionsReturnObj.errorMsg===''){
           
            dispatch(deleteStoreTodo(response.data.functionsReturnObj.todoId))
            recievePrompt(response.data.functionsReturnObj.message)
           }
           if(response.data.functionsReturnObj.errorMsg && response.data.functionsReturnObj.message==='' && !response.data.functionsReturnObj.todoId){
          
            recievePrompt(response.data.functionsReturnObj.errorMsg)
           }
        }
        if(response.data.functionsReturnObj.functionName==='complete_todo'){
          if(response.data.functionsReturnObj.message && response.data.functionsReturnObj.todoId && response.data.functionsReturnObj.errorMsg===''){
            dispatch(setTodoCompletion({id:response.data.functionsReturnObj.todoId,completed:response.data.functionsReturnObj.completed}))
            recievePrompt(response.data.functionsReturnObj.message)
           }
           if(response.data.functionsReturnObj.errorMsg && response.data.functionsReturnObj.message==='' && !response.data.functionsReturnObj.todoId){
             recievePrompt(response.data.functionsReturnObj.errorMsg)
           }
        }
      }
    },
    onError:async(error,message,fcmToken)=>{
      if((error.status===400 || error.status===500) && error.response.data.message){
       recievePrompt(error.response.data.message)
      }
      if(error.status===401){
        await refreshUserToken()
      try {
          promptAiMutation({message,fcmToken})
      } catch (error) {
        dispatch(isLoggedIn(false))
        navigate('/login')
        toast.error('User Logged Out!')
      }
      }
    }
  })

  const recievePrompt=(message)=>{
    const messageCont=document.getElementById("messageCont")
    const responseDiv=document.createElement("div")
    responseDiv.id="responseDiv"
    responseDiv.className="flex flex-col"
    responseDiv.innerHTML=`
     <div class="self-start bg-gray-500 max-w-[295px] text-white py-2 px-3 text-[15px] rounded-b-lg rounded-r-lg my-1" >
     ${message}
     </div>
    `
    messageCont.appendChild(responseDiv)
    messageCont.scrollTop=messageCont.scrollHeight
}


  const sendPrompt=async(message)=>{
    if(prompt!==""){
      const messageCont=document.getElementById("messageCont")
      const promptDiv=document.createElement("div")
      promptDiv.id="promptDiv"
      promptDiv.className="flex flex-col"
      promptDiv.innerHTML=`
       <div class="self-end bg-purple-500 max-w-[295px] text-white py-2 px-3 text-[15px] rounded-t-lg rounded-l-lg my-1" >
       ${message}
       </div>
      `
      messageCont.appendChild(promptDiv)
      messageCont.scrollTop=messageCont.scrollHeight
      
      setPrompt("")

      promptAiMutation({message,fcmToken})

    }
  }


  const handleWordDownload = (noteTitle) => {
    if (content || content === "") {
     

      const header =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
      const footer = "</body></html>";
      const sourceHTML = header + content + footer;

      const blob = new Blob([sourceHTML], { type: "application/msword" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${noteTitle}.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const createRoomID = () => {
    const roomID = uuidv4();
    setRoomID(roomID);
  };

  const joinRoom = async() => {
    if (!roomID || !roomName) {
      toast.error("Room Id and Room Name are required");
      return;
    }
    if(!socketRef.current) {
      socketRef.current= await initSocket() 
      dispatch(setJoinedRoom(true))
     
    }
    if(socketRef.current && !joinedRoom) {
      dispatch(setJoinedRoom(true))
  };
}
const sendUpdatedText=(content)=>{
  socketRef.current.emit("send-updated-text", content, roomID)
}
useEffect(()=>{
  
  if(socketRef.current && joinedRoom){

    socketRef.current.on("receive-updated-text",(content)=>{
      
      setContent(content)

      
    })
  }
  return () => {
    if(socketRef.current && joinedRoom) {
    
      socketRef.current.off("receive-updated-text");
    }
  };
})
const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      aiButtonRef.current.click(); 
    }
  };

  return (
    <div className="relative top-[2.74rem] bg-white">
      <div className="flex justify-between items-center bg-white border-b-2 border-gray-200 py-1 px-3 h-13">
        <div className="text-gray-600 text-lg note-title"><span>Title:</span> <span>{note.title}</span></div>
        <div className="flex items-center gap-2">
          <span onClick={()=>setShowAiBox(true)} className="bg-gradient-to-r from-pink-400 to-violet-500 p-2 flex items-center gap-1 text-white rounded-3xl text-[16px] cursor-pointer w-[55px] hover:bg-purple-600">
           AI<img src={chatbotAiImg} alt="Ai img" />
          </span>
          <button
            className="bg-blue-500 text-white p-2 text-sm rounded hover:bg-blue-600"
            onClick={() => handleWordDownload(note.title)}
          >
            Download
          </button>
          <span
            className=" text-[14px] py-2 px-4 rounded outline-2 cursor-pointer outline-purple-500 text-purple-500 mx-2 hover:bg-purple-500 hover:text-white"
            onClick={() => handleEditorChange(content)}
          >
            {saving ? "Saving..." : "Save"}
          </span>
        </div>
      </div>
      
      
      <div className="flex items-center justify-between editor-chat-cont">
        <div className={`w-1/3 mx-2 chat-cont ${openChat===true?("disp-block"):(null)} `}>
        {

          showAiBox?(
          <div className="`h-[80vh] flex flex-col justify-between max-w-[370px] bg-white min-w-[300px]  border-2 rounded-md border-purple-300 mx-auto  relative">
            <div className="flex justify-between items-center text-lg font-semibold bg-blue-500 text-white p-2 rounded-t-sm">
                 <div className="flex gap-1">
                 Note AI 
                 <img src={chatbotAiImg} alt="Ai img" />
                 </div>
                 <div onClick={()=>setShowAiBox(false)} className="p-1 hover:bg-blue-400 rounded-full">
                   <img src={cross} alt="close chatbot" />
                 </div>
              </div>
              <div id="messageCont" className="h-[calc(100vh-17rem)]  bg-white flex flex-col overflow-auto px-2 break-keep">
                {
                  aiPromptPending?(
                    <div className="my-2"><img src={aiLoading} className="w-[40px]" alt="loading" /></div>
                  ):(
                    null
                  )
                }
              </div>
               <div className="h-[100px] max-w-[100%] mx-3 border-2 border-purple-300 my-2 rounded-lg">
                    <div className="relative ">
                       <textarea  className="chat-input text-purple-500 bg-white "
                      placeholder="Type your message..."
                      value={prompt}
                      onKeyDown={(e)=>handleKeyDown(e)}
                      onChange={(e)=>setPrompt(e.target.value)}
                      rows={3}></textarea>
                    </div>
                      <div ref={aiButtonRef} onClick={()=>sendPrompt(prompt)} className="absolute z-10  bg-purple-500 hover:bg-purple-600 p-2 rounded-md bottom-4 right-5"><img src={send} alt="send" /></div>
                   </div>
              
          </div>
            

          ):(
            (!joinedRoom && !socketRef.current)?(
              <div className="flex flex-col items-center justify-center h-[calc(100vh-7rem)]  mx-auto max-w-[370px] min-w-[300px] bg-white border-2 border-purple-300 rounded-[9px] gap-3">
               
                <img src={chatGif} className="w-[300px]" alt="chat img" />
               
              <input
                type="text"
                name="roomID"
                placeholder="Enter or generate room id"
                value={roomID}
                className="outline-2 outline-purple-400 text-purple-600 hover:outline-purple-500 rounded p-2 w-[74%] text-sm"
                onChange={(e) => setRoomID(e.target.value)}
              />
              <input
                type="text"
                name="roomName"
                placeholder="Enter room name"
                onChange={(e) => setRoomName(e.target.value)}
                className="outline-2 text-purple-600 rounded outline-purple-400 hover:outline-purple-500 p-2 w-[74%] text-sm"
              />
              <div className="flex gap-3">

              <button
                className="bg-purple-500 text-white py-2 px-3 text-sm rounded hover:bg-purple-600"
                onClick={() => createRoomID()}
              >
                Create Room
              </button>
              <button className="bg-green-600 text-white text-sm py-2 px-3 rounded hover:bg-green-700" onClick={()=> joinRoom()}>
                Join Room
              </button>
              </div>
            </div>
            ):(
              <CollaborateChatRoom socketRef={socketRef} roomID={roomID} roomName={roomName} userFullName={userFullName}/>
            )
    
          )
        
      
        
        }
        </div>
        <div onClick={()=>setOpenChat(prev=>!prev)} className={`p-2 rounded-full bg-purple-700 text-white chat-btn hidden absolute ${openChat===true?(showAiBox===true?("top-1 opacity-0"):("top-16 right-12")):("bottom-7 left-5")} z-10  shadow-md shadow-gray-400`}>
          {
            openChat===false?(<img src={Chat} alt="chat"/>):( <img src={cross} alt="close"/>)
          }
         
        </div>
        <div className="w-2/3 h-[calc(100vh-7rem)] text-editor border-gray-300 m-2">
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={content}
      
            init={{
              height: "100%",
              branding: false,
              skin: "borderless",
              menubar: true,
             
              help_accessibility: false,
              resize:false,
              
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              images_upload_handler: handleImageUpload,
              automatic_uploads: true,

              file_picker_types: "image",
              file_picker_callback: function (cb, value, meta) {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");

                input.onchange = function () {
                  const file = this.files[0];

                  const validTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                  ];
                  if (!validTypes.includes(file.type)) {
                    alert(
                      "Please select a valid image file (JPEG, PNG, GIF, WEBP)"
                    );
                    return;
                  }

                  if (file.size > 5 * 1024 * 1024) {
                    alert("File size should be less than 5MB");
                    return;
                  }

                  const reader = new FileReader();
                  reader.onload = function (e) {
                    cb(e.target.result, { alt: file.name });
                  };
                  reader.readAsDataURL(file);
                };

                input.click();
              },
            }}
            onEditorChange={(e) => {
              setContent(e)
              if(socketRef.current && joinedRoom) {
                sendUpdatedText(e)
              }
            }}
          />
        </div>
       
       

      
     
      </div>

       
     
    </div>
  );
};

export default NoteEditPage;
