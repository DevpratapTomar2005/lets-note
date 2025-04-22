import { useSelector,useDispatch } from "react-redux"
import { setShowChatBot } from '../slices/showChatBotSlice'
import chatbotAiImg from '../assets/icons and logos/chatbotAiImg.svg'
import cross from '../assets/icons and logos/cross.svg'
import send from '../assets/icons and logos/send.svg'
function AiChatbot() {
    const showChatBot=useSelector((state)=>state.showChatBot.showChatBot)
    const dispatch=useDispatch()
  return (
    <div className={`h-[calc(100vh-3.24rem)] flex flex-col justify-between w-[600px] border-l-2 border-t-2 rounded-tl-md border-purple-300 shadow-[-4px_-1px_15px_rgba(0,0,0,0.1)] mt-2 relative top-[2.74rem] transition-all duration-200   ease-out ${(showChatBot)?("translate-x-0"):("translate-x-[105%] hidden ")}`}>
     <div className="flex justify-between items-center text-lg font-semibold bg-blue-500 text-white p-2 rounded-tl">
      <div className="flex gap-1">
      Note AI 
      <img src={chatbotAiImg} alt="Ai img" />
      </div>
      <div onClick={()=>dispatch(setShowChatBot(false))} className="p-1 hover:bg-blue-400 rounded-full">
        <img src={cross} alt="close chatbot" />
      </div>
     </div>
     <div>
     </div>
     <div id="messageCont" className="h-[calc(100vh-14rem)] flex flex-col overflow-auto px-2">
     
    </div>


     <div className="h-[100px] max-w-[100%] mx-3 border-2 border-purple-300 my-2 rounded-lg">
      <div className="relative">
         <textarea  className="chat-input text-purple-500"
        placeholder="Type your message..."
        
        rows={3}></textarea>
      </div>
        <div className="absolute z-10  bg-purple-500 hover:bg-purple-600 p-2 rounded-md bottom-4 right-5"><img src={send} alt="send" /></div>
     </div>

    </div>
  )
}

export default AiChatbot