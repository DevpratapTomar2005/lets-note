import { useEffect,useState,useRef } from "react";
import endCallImg from "../assets/icons and logos/endCall.svg"
import { useDispatch,useSelector } from "react-redux";
import { setJoinedRoom } from "../slices/roomJoinSlice.js";
import Avatar from "react-avatar";
const CollaborateChatRoom = ({ socketRef, roomID, roomName, userFullName }) => {
  const [senderMessage,setSenderMessage]=useState("")
    const buttonRef=useRef()
 const dispatch=useDispatch()
 console.log(roomName)
const userPfp=useSelector(state=>state.user.pfp)
  console.log("socketRef", socketRef.current)

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("connected", roomID, userFullName, roomName)
      
      const messageCont=document.getElementById("messageCont")
        const lastChild = messageCont.lastElementChild;
        const isSameAsLastNode =lastChild?.textContent.trim() === 'You joined the room'.trim();
      
      if (!isSameAsLastNode)
      {

        const alertDiv=document.createElement("div")
        alertDiv.id="alertDiv"
        alertDiv.className="flex my-1"
        alertDiv.innerHTML=`
         <div class="mx-auto bg-red-200 text-red-500 outline-1 outline-red-500  py-1 px-2 text-[10px] rounded-md" >
         You joined the room
         </div>
        `
        messageCont.appendChild(alertDiv)
        messageCont.scrollTop=messageCont.scrollHeight
      }
     
      socketRef.current.on("welcome", (message, room) => {

        
        const messageCont=document.getElementById("messageCont")
        const lastChild = messageCont.lastElementChild;


      const isSameAsLast2 = lastChild?.textContent.trim() === message.trim();
      
      if (isSameAsLast2){
        return ;
      }
      else{

        const alertDiv=document.createElement("div")
        alertDiv.id="alertDiv"
        alertDiv.className="flex my-1"
        alertDiv.innerHTML=`
         <div class="mx-auto bg-red-200 text-red-500 outline-1 outline-red-500 py-1 px-2 text-[10px] rounded-md" >
         ${message}
         </div>
        `
        messageCont.appendChild(alertDiv)
        messageCont.scrollTop=messageCont.scrollHeight
         
        
      }
        
      })
      

      socketRef.current.on("user-disconnected", (message, room,userFullNameRecieved) => {
        console.log(message, room);
          const messageCont=document.getElementById("messageCont")
        const lastChild = messageCont.lastElementChild;


      const isSameAsLast3 = lastChild?.textContent.trim() === message.trim() || lastChild?.textContent.trim() === `${userFullNameRecieved} joined the room`.trim();
     console.log(isSameAsLast3)
      if (isSameAsLast3){
       return;
        
      }else{
        const alertDiv=document.createElement("div")
        alertDiv.id="alertDiv"
        alertDiv.className="flex my-1"
        alertDiv.innerHTML=`
         <div class="bg-red-200 text-red-500 outline-1 outline-red-500 mx-auto py-1 px-2 text-[10px] rounded-md" >
         ${message}
         </div>
        `
        messageCont.appendChild(alertDiv)
        messageCont.scrollTop=messageCont.scrollHeight
        
      }
      })
      const recieveMessage=(message,userFullNameRecieved,userPfpRecieved)=>{
          const messageCont=document.getElementById("messageCont")
          const recieveDiv=document.createElement("div")
          recieveDiv.id="recieveDiv"
          recieveDiv.className="flex gap-1"
          recieveDiv.innerHTML=`
          <div>
          ${userPfpRecieved?(`<img src=${userPfpRecieved} title=${userFullNameRecieved} class="rounded-full h-6 border-1 border-purple-500 w-6" alt='user pfp'/>`):(`<div title="${userFullNameRecieved}" class="w-6 h-6 rounded-full bg-[#FF00FF] text-white text-[10px] flex items-center justify-center">
             ${userFullNameRecieved?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
           </div>`)}
          </div>
           <div class="self-start bg-gray-600 max-w-[295px] text-white py-2 px-3 text-[15px] rounded-b-lg rounded-r-lg my-1" >
           ${message}
           </div>
          `
          messageCont.appendChild(recieveDiv)
          messageCont.scrollTop=messageCont.scrollHeight
    }
      socketRef.current.on("receive-message", (message,userFullName,userPfpRecieved) => {
       
        recieveMessage(message,userFullName,userPfpRecieved)
      })
    }
  
    return () => {
     
      if (socketRef.current) {
       socketRef.current.emit("disconnecting-user-accidentaly", roomID,userFullName)
        socketRef.current.removeAllListeners()
      }
      
    };
  }, [])

  const handelDisconnect = () => {
    if (socketRef.current) {
      socketRef.current.emit("disconnect-user", roomID,userFullName)
      socketRef.current.removeAllListeners()
      socketRef.current=false
    dispatch(setJoinedRoom(false))
      return
    }
  }

  const sendMessage=(message)=>{
    if(socketRef.current && senderMessage!==""){
      const messageCont=document.getElementById("messageCont")
      const senderDiv=document.createElement("div")
      senderDiv.id="senderDiv"
      senderDiv.className="flex flex-col"
      senderDiv.innerHTML=`
       <div class="self-end bg-purple-500 text-white max-w-[295px] py-2 px-3 text-[15px] rounded-t-lg rounded-l-lg my-1" >
       ${message}
       </div>
      `
      messageCont.appendChild(senderDiv)
      messageCont.scrollTop=messageCont.scrollHeight
     
      socketRef.current.emit("send-message", message, roomID,userFullName,userPfp)
      setSenderMessage("")

    }
  }
   const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      buttonRef.current.click(); 
    }
  };


  return (
    <div className="border-2 border-purple-300 rounded-[10px] max-w-[370px] min-w-[300px] mx-auto h-full">
      <div className="bg-purple-500 flex items-center justify-between h-[2.8rem] p-2 rounded-t-md shadow-md shadow-gray-300 text-white">
        <div className="font-audiowide text-lg font-semibold">
          {roomName}
        </div>
       
        <div onClick={()=>handelDisconnect()} className="p-[2px] w-[33px] cursor-pointer hover:bg-purple-400 rounded-full">
          <img src={endCallImg} className="w-full" alt="end call img" />
        </div>
      </div>
      <div id="messageCont" className="h-[calc(100vh-15.2rem)] flex flex-col overflow-auto px-2 mt-3">
        
      </div>
      <div className="h-[3.5rem] flex items-center gap-1 border-2 border-purple-400 rounded-xl max-w-[95%] px-2 mx-auto my-2 shadow-md shadow-gray-300">
        <input type="text" value={senderMessage} onKeyDown={(e)=>handleKeyDown(e)} onChange={(e)=>{setSenderMessage(e.target.value)}} className="w-full text-purple-500  h-full focus:outline-none" />
        <button ref={buttonRef} className="px-2 py-2 bg-blue-600 hover:bg-blue-400 text-white rounded-lg" onClick={()=>sendMessage(senderMessage)}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CollaborateChatRoom;
