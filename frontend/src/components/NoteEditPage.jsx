import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation } from "@tanstack/react-query";
import {
  updateNote,
  refreshUserToken,
  uploadContentImg,
} from "../services/apiCalls";
import { updateStoreNote } from "../slices/userSlice";
import { isLoggedIn } from "../slices/loginSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import CollaborateChatRoom from "./CollaborateChatRoom";
import { initSocket } from "../services/socket";



const NoteEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");
  const [roomName, setRoomName] = useState("");
  const[joinedRoom,setJoinedRoom]=useState(false)
  const notes = useSelector((state) => state.user.notes);
  const { noteId } = useParams();
  const note = notes.filter((n) => n._id == noteId)[0];
  const [content, setContent] = useState(note.content);
  const userFullName=useSelector(state=>state.user.fullname)
 

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
        try {
          await refreshUserToken();
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
          console.error("Upload failed:", error);
          if (error.status === 401) {
            try {
              await refreshUserToken();
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
      setJoinedRoom(true) 
     
    }
    if(socketRef.current && !joinedRoom) {
      setJoinedRoom(true)
  };
}
const sendUpdatedText=(content)=>{
  socketRef.current.emit("send-updated-text", content, roomID)
}
useEffect(()=>{
  console.log(joinedRoom)
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


  return (
    <div className="relative top-[2.74rem]">
      <div className="flex justify-between items-center bg-white border-b-1 border-gray-300 py-1 px-3 h-13">
        <div className="text-gray-600 text-lg">Title: {note.title}</div>
        <div>
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
      <div className="flex items-center justify-between">
        <div className="w-1/3 mx-2">
        {
        (!joinedRoom && !socketRef.current)?(
          <div className="flex flex-col items-center justify-center h-[calc(100vh-7rem)]  mx-auto max-w-[370px] min-w-[300px] bg-white border-1 border-purple-600 rounded-[9px] gap-3">
          <input
            type="text"
            name="roomID"
            placeholder="Enter or generate room id"
            value={roomID}
            className="outline-1 rounded p-2 w-[74%] text-sm"
            onChange={(e) => setRoomID(e.target.value)}
          />
          <input
            type="text"
            name="roomName"
            placeholder="Enter room name"
            onChange={(e) => setRoomName(e.target.value)}
            className="outline-1 rounded p-2 w-[74%] text-sm"
          />
          <button
            className="bg-purple-600 text-white py-2 px-3 rounded hover:bg-purple-500"
            onClick={() => createRoomID()}
          >
            Create Room
          </button>
          <button className="bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700" onClick={()=> joinRoom()}>
            Join Room
          </button>
        </div>
        ):(
          <CollaborateChatRoom socketRef={socketRef} roomID={roomID} roomName={roomName} userFullName={userFullName}/>
        )

        
        }
        </div>
        <div className="w-2/3 h-[calc(100vh-7rem)] border-gray-300 m-2">
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
