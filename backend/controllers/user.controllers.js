import User from '../models/userSchema.js'
import sendNotifications from '../utils/notificationService.js'
import schedule from 'node-schedule'
import {uploadImage,uploadPfpImage} from '../utils/cloudinary.js'
import ai from '../utils/aiService.js'
import {makeTodo,todoDelete,completeTodo} from '../utils/aiTools.js'
import { Type } from '@google/genai'
const createTodo=async(req,res)=>{
    const {todoData}=req.body.todoData
    
   try {
     const user=await User.findById(req.user.id)
     if(!user){
         return res.status(400).json({message:'User not found!'})
     }
     const newTodo={
        title:todoData.title,
        dueDate:todoData.dueDate || new Date(),
        notifyMe:todoData.notifyMe,
        notificationTime:todoData.notificationTime,
        completed:false
    }
    user.todos.push(newTodo)
    await user.save({validateBeforeSave:false})
    const savedTodo = user.todos[user.todos.length - 1];
    
    if(todoData.notifyMe && todoData.notificationTime && todoData.deviceToken){
        const scheduledDate = new Date(`${todoData.dueDate} ${todoData.notificationTime}`)
        try {
            const job=schedule.scheduleJob(scheduledDate,async()=>{
                
              const response=  await sendNotifications(todoData.deviceToken,todoData.title,'You have a task due!!')
                
            });
            
        } catch (error) {
            return res.status(500).json({message:'Notification not sent!'})
        }
    }

     return res.status(201).json({message:'Todo Created Successfully!',todo:savedTodo})
   } catch (error) {
    return res.status(500).json({message:'Something went wrong!'})
   }

}

const deleteTodo=async(req,res)=>{
    const id=req.body.id
    
   try {
     const user=await User.findById(req.user.id).select('-notes -refreshToken -createdAt -updatedAt')
     if(!user){
         return res.status(400).json({message:'User not found!'})
     }
     
     const unDeletedTodos=user.todos.filter(todo=>todo._id.toString()!==id)
     user.todos=unDeletedTodos
     await user.save({validateBeforeSave:false})
     return res.status(201).json({message:'Todo Deleted Successfully!',id})
   } catch (error) {
    return res.status(500).json({message:'Something went wrong!'})
   }
}


const taskCompleted=async(req,res)=>{
    const {id,completed}=req.body
   
   try {
     const user=await User.findById(req.user.id).select('-notes -refreshToken -createdAt -updatedAt')
     if(!user){
         return res.status(400).json({message:'User not found!'})
     }
     
     if(completed===true){
         user.todos.filter(todo=>todo._id.toString()===id)[0].completed=true
     }
     else{
         user.todos.filter(todo=>todo._id.toString()===id)[0].completed=false
     }
     await user.save({validateBeforeSave:false})
     return res.status(201).json({message:'Todo Updated Successfully!',id,completed})
   } catch (error) {
    return res.status(500).json({message:'Something went wrong!'})
   }
}

const createNote=async(req,res)=>{
    const title=req.body.title
   
    try {
        const user=await User.findById(req.user.id).select('-todos -refreshToken -createdAt -updatedAt')
        if(!user){
            return res.status(400).json({message:'User not found!'})
        }
        user.notes.push({title})
        await user.save({validateBeforeSave:false})
        const savedNote=user.notes[user.notes.length-1]
        return res.status(201).json({message:'Note Created Successfully!',note:savedNote})
    } catch (error) {
        return res.status(500).json({message:'Something went wrong!'})
    }
}

const deleteNote=async(req,res)=>{
    const id=req.body.id
    
    
   try {
     const user=await User.findById(req.user.id).select('-todos -refreshToken -createdAt -updatedAt')
     if(!user){
         return res.status(400).json({message:'User not found!'})
     }
     
     const unDeletedNotes=user.notes.filter(todo=>todo._id.toString()!==id)
     user.notes=unDeletedNotes
     await user.save({validateBeforeSave:false})
     return res.status(201).json({message:'Note Deleted Successfully!',id})
   } catch (error) {
    return res.status(500).json({message:'Something went wrong!'})
   }
}

const editNote=async(req,res)=>{
    const {id,content}=req.body

   try {
     const user= await User.findById(req.user.id).select('-todos -refreshToken -createdAt -updatedAt')
     if(!user){
         return res.status(400).json({message:'User not found!'})
     }
     user.notes.filter(note=>note._id.toString()===id)[0].content=content
     await user.save({validateBeforeSave:false}) 
     return res.status(201).json({message:'Note Updated Successfully!',id,content})
   } catch (error) {
    return res.status(500).json({message:'Something went wrong!'})
   }

}

const uploadContentImg=async(req,res)=>{
    const tinyMCEImg=req.file.path
    
    try {
        const uploadResult=await uploadImage(tinyMCEImg)
       
        if(!uploadResult){
            return res.status(400).json({message:'Image not uploaded!'})
        }
   
        return res.status(201).json({message:'Image uploaded successfully!',url:uploadResult.secure_url})
    } catch (error) {
        return res.status(500).json({message:'Something went wrong!'})
        
    }
}
const uploadPfp=async(req,res)=>{
    const pfp=req.file.path
    try {
        
        const uploadedPfp=await uploadPfpImage(pfp,req.user.id)
        if(!uploadedPfp){
            return res.status(400).json({message:'Image not uploaded!'})
        }
        const user=await User.findById(req.user.id).select('-todos -notes -refreshToken -createdAt -updatedAt')
        user.pfpUrl=uploadedPfp.secure_url
        await user.save({validateBeforeSave:false})
        return res.status(201).json({message:'Image uploaded successfully!',pfpUrl:user.pfpUrl})
    } catch (error) {
        return res.status(500).json({message:'Something went wrong!'})
    }
}

const makeTodoDeclaration= {
    name: 'create_todo',
    description: "create a new todo and store it in a database with the given title, due Date ,  wantNotification(optional), notification time(if user wants notification). ",
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
       
          description: 'The title or task for which user wants to make a todo',
        },
        dueDate: {
          type: Type.STRING,
          description: "user may have provided DD/MM/YYYY or D/M/YY or DD-MM-YYYY or D-M-YY format date but convert it into ISO date format (eg, '2023-10-01T00:00:00Z').",
        },
        wantNotification: {
          type: Type.BOOLEAN,
          description: 'If user wants to schedule a todo or want notification of due task. if user have mentioned time or mentioned words similar to schedule or want notification then it will be true otherwise false and if the user have mentioned time but not want notification then ask for it',
        },
        notificationTime: {
          type: Type.STRING,
          description: 'The time of the notification in HH:MM format (eg, "14:30") user may have provided H:M format convert it to HH:MM format. if user wants notification or schedule but not mentioned time then ask for it and if user deny to want notification then do not ask',
        },
      },
      required: ['title', 'dueDate', 'wantNotification', 'notificationTime'],
    },
  };

const deleteTodoDeclaration={
    name: 'delete_todo',
    description: "delete a todo from the database with the given title.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: 'The title of the todo to be deleted.',
        },
      },
      required: ['title'],
    },
  };

  const completeTodoDeclaration={
    name: 'complete_todo',
    description: "mark a todo as completed in the database with the given title.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: 'The title of the todo to be marked as completed.',
        },
        completed:{
            type:Type.BOOLEAN,
            description:'If user have mentioned completed or not then it will be true otherwise false'
        }
      },
      required: ['title','completed'],
    },
  }

const systemPrompt='You are an ai assistant for a web app which helps user in writting content, helping them in managing todos by providing the functionality of creating deleting and set the todo completion status with the help of tools provided to you. you will be provided with a message and you have to respond with a message in the same language. you have to respond in the same language as the message is in. You will generate the content normally but when user asks to create, delete or set complete status of todos then only you will call the tools.'
let chatHistory=[{role:'user',parts:[{text:systemPrompt}]}];

const aiAgent=async(req,res)=>{
    const {message,fcmToken}=req.body
   
  
    chatHistory.push({role:'user',parts:[{ text:message }]})
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: chatHistory,
            config:{

                tools: [{
                    functionDeclarations: [makeTodoDeclaration,deleteTodoDeclaration,completeTodoDeclaration],
                  }],

            }
            
          });
          const aiResponse=response.candidates[0].content.parts[0]
    
    
          if(aiResponse.text){
            chatHistory.push({role:'assistant',parts:[{ text:aiResponse.text }]})
            return res.status(200).json({message:aiResponse.text})
           
          }
          else if(aiResponse.functionCall){
              chatHistory.push({role:'assistant',parts:[{ functionCall:aiResponse.functionCall }]})
              
              let functionsReturnObj={
                functionName:aiResponse.functionCall.name,
                message:'',
                errorMsg:'',
                todoId:'',
                completed:false,
                todo:{}
              }
            if(response.candidates[0].content.parts[0].functionCall && response.candidates[0].content.parts[0].functionCall.name==="create_todo"){
    
                const {message,errorMsg,todo}=await makeTodo(req.user.id,response.candidates[0].content.parts[0].functionCall.args.title,response.candidates[0].content.parts[0].functionCall.args.dueDate,fcmToken,response.candidates[0].content.parts[0].functionCall.args.wantNotification,response.candidates[0].content.parts[0].functionCall.args.notificationTime)
                if(message && !errorMsg){
                  functionsReturnObj.message=message,
                  functionsReturnObj.todo=todo
                }
                if(errorMsg && !message){
                  functionsReturnObj.errorMsg=errorMsg
                }
            }
    
             if(response.candidates[0].content.parts[0].functionCall && response.candidates[0].content.parts[0].functionCall.name==="delete_todo"){
              const {message,errorMsg,todoId}=await todoDelete(req.user.id,response.candidates[0].content.parts[0].functionCall.args.title)
             
              if(message && !errorMsg){
                functionsReturnObj.message=message,
                functionsReturnObj.todoId=todoId
              }
              if(errorMsg && !message){
                functionsReturnObj.errorMsg=errorMsg
              }
            }
    
            if(response.candidates[0].content.parts[0].functionCall && response.candidates[0].content.parts[0].functionCall.name==="complete_todo"){
              const {message,errorMsg,todoId,completed}=await completeTodo(req.user.id,response.candidates[0].content.parts[0].functionCall.args.title,response.candidates[0].content.parts[0].functionCall.args.completed)
              if(message && !errorMsg){
                functionsReturnObj.message=message,
                functionsReturnObj.todoId=todoId,
                functionsReturnObj.completed=completed
              }
              if(errorMsg && !message){
                functionsReturnObj.errorMsg=errorMsg
              }
            }
            
            return res.status(200).json({functionsReturnObj})
            
          }
          else{
            chatHistory.push({role:'assistant',parts:[{ text:'Unable to process your request' }]})
            return res.status(400).json({message:'Unable to process your request'})
          }
          
         
    } catch (error) {
      console.log("error in ai agent",error)
        return res.status(500).json({message:'Something went wrong!'})
        
    }

}

export default {
    
    createTodo,
    deleteTodo,
    taskCompleted,
    createNote,
    deleteNote,
    editNote,
    uploadContentImg,
    uploadPfp,
    aiAgent
}