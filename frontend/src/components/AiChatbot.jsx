import { useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { setShowChatBot } from '../slices/showChatBotSlice'
import chatbotAiImg from '../assets/icons and logos/chatbotAiImg.svg'
import cross from '../assets/icons and logos/cross.svg'
import send from '../assets/icons and logos/send.svg'
import {promptAi,refreshUserToken} from '../services/apiCalls.js'
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../slices/loginSlice.js"
import { toast } from "react-toastify";
import {useMutation} from '@tanstack/react-query'
import { setTodos,setTodoCompletion,deleteStoreTodo } from "../slices/userSlice.js"
function AiChatbot() {
    const showChatBot=useSelector((state)=>state.showChatBot.showChatBot)
    const fcmToken=useSelector((state)=>state.user.fcmToken)
    const [prompt,setPrompt]=useState("")
    
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {mutate:promptAiMutation}=useMutation({
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
        try {
            await refreshUserToken()
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
       <div class="self-start bg-gray-500 text-white py-2 px-3 text-[15px] rounded-b-lg rounded-r-lg my-1" >
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
         <div class="self-end bg-purple-500 text-white py-2 px-3 text-[15px] rounded-t-lg rounded-l-lg my-1" >
         ${message}
         </div>
        `
        messageCont.appendChild(promptDiv)
        messageCont.scrollTop=messageCont.scrollHeight
        
        setPrompt("")

        promptAiMutation({message,fcmToken})

      }
    }
  return (
    <div className={`h-[calc(100vh-3.24rem)] flex flex-col justify-between w-[600px] border-l-2 border-t-2 rounded-tl-md border-purple-300 shadow-[-4px_-1px_15px_rgba(0,0,0,0.1)] mt-2 relative z-10 top-[2.74rem] transition-all duration-200   ease-out ${(showChatBot)?("translate-x-0"):("translate-x-[105%] hidden ")}`}>
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
     <div id="messageCont" className="h-[calc(100vh-14rem)] bg-white flex flex-col overflow-auto px-2">
     
    </div>


     <div className="h-[100px] max-w-[100%] mx-3 border-2 border-purple-300 my-2 rounded-lg">
      <div className="relative">
         <textarea  className="chat-input text-purple-500 bg-white"
        placeholder="Type your message..."
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
        rows={3}></textarea>
      </div>
        <div onClick={()=>sendPrompt(prompt)} className="absolute z-10  bg-purple-500 hover:bg-purple-600 p-2 rounded-md bottom-4 right-5"><img src={send} alt="send" /></div>
     </div>

    </div>
  )
}

export default AiChatbot;