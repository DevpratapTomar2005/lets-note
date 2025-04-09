import { useEffect,useState } from "react";

const CollaborateChatRoom = ({ socketRef, roomID, roomName, userFullName }) => {
  const [senderMessage,setSenderMessage]=useState("")
  console.log("socketRef", socketRef.current)

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("connected", roomID, userFullName, roomName)
      socketRef.current.on("welcome", (message, room) => {
        console.log(message);
        console.log("room:", room);
      })

      socketRef.current.on("user-disconnected", (message, room) => {
        console.log(message, room);
      })
      const recieveMessage=(message)=>{
          const messageCont=document.getElementById("messageCont")
          const recieveDiv=document.createElement("div")
          recieveDiv.id="recieveDiv"
          recieveDiv.className="flex flex-col"
          recieveDiv.innerHTML=`
           <div class="self-start bg-gray-500 text-white py-2 px-3 text-[15px] rounded-b-lg rounded-r-lg my-1" >
           ${message}
           </div>
          `
          messageCont.appendChild(recieveDiv)
          messageCont.scrollTop=messageCont.scrollHeight
    }
      socketRef.current.on("receive-message", (message) => {
        recieveMessage(message)
      })
    }
  
    return () => {
      if (socketRef.current) {
        socketRef.current.emit("disconnecting-user-accidentaly", roomID)
        socketRef.current.removeAllListeners()
      }
    };
  }, [roomID, socketRef.current, roomName, userFullName])

  const handelDisconnect = () => {
    if (socketRef.current) {
      socketRef.current.emit("disconnect-user", roomID)
      socketRef.current.removeAllListeners()
    }
  }

  const sendMessage=(message)=>{
    if(socketRef.current && senderMessage!==""){
      const messageCont=document.getElementById("messageCont")
      const senderDiv=document.createElement("div")
      senderDiv.id="senderDiv"
      senderDiv.className="flex flex-col"
      senderDiv.innerHTML=`
       <div class="self-end bg-purple-500 text-white py-2 px-3 text-[15px] rounded-t-lg rounded-l-lg my-1" >
       ${message}
       </div>
      `
      messageCont.appendChild(senderDiv)
      messageCont.scrollTop=messageCont.scrollHeight
      socketRef.current.emit("send-message", message, roomID)
      setSenderMessage("")

    }
  }
 


  return (
    <div className="border-1 border-purple-600 rounded-[9px] max-w-[370px] min-w-[300px] mx-auto h-full">
      <div className="bg-purple-600 h-[2.8rem] p-2 rounded-t-lg shadow-md shadow-gray-300 text-white">
        this is room name
      </div>
      <div id="messageCont" className="h-[calc(100vh-15.2rem)] flex flex-col overflow-auto px-2 mt-3">
      </div>
      <div className="h-[3.5rem] flex items-center gap-1 border-2 border-gray-400 rounded-xl max-w-[95%] px-2 mx-auto my-2 shadow-lg shadow-gray-300">
        <input type="text" value={senderMessage} onChange={(e)=>{setSenderMessage(e.target.value)}} className="w-full  h-full focus:outline-none" />
        <button className="px-2 py-2 bg-blue-600 text-white rounded-lg" onClick={()=>sendMessage(senderMessage)}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CollaborateChatRoom;
