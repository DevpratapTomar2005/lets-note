import User from "../models/userSchema.js"
import sendNotifications from '../utils/notificationService.js'
import schedule from 'node-schedule'
export const makeTodo=async(userId,title,dueDate,fcmToken,wantNotification,notificationTime)=>{

      try {
     const user=await User.findById(userId).select('-notes -refreshToken -createdAt -updatedAt')
     if(!user){
         return {errorMsg:'User Not Found!'}
     }
     
     const newTodo={
        title:title,
        dueDate:new Date(dueDate),
        notifyMe:wantNotification,
        notificationTime:notificationTime,
        completed:false
    }
    user.todos.push(newTodo)
    await user.save({validateBeforeSave:false})
    const savedTodo = user.todos[user.todos.length - 1];
    if(wantNotification && fcmToken){
        const scheduledDate = new Date(`${dueDate} ${notificationTime}`)
        try {
            const job=schedule.scheduleJob(scheduledDate,async()=>{
                
              const response=  await sendNotifications(fcmToken,title,'You have a task due!!')
                
            });
            
        } catch (error) {
            return {errorMsg:'Notification not sent!'}
        }
    }

     return {message:'Todo Created Successfully!',todo:savedTodo}
   } catch (error) {
    return {errorMsg:'Something went wrong!'}
   }
}

export const todoDelete=async(userId,todoTitle)=>{
   try {
     const user=await User.findById(userId).select('-notes -refreshToken -createdAt -updatedAt')
     if(!user){
         return {errorMsg:'User Not Found!'}
     }
     const deletedTodo=user.todos.filter(todo=>todo.title===todoTitle)[0]
     const unDeletedTodos=user.todos.filter(todo=>todo.title!==todoTitle)
     user.todos=unDeletedTodos
     await user.save({validateBeforeSave:false})
     return {message:'Todo Deleted Successfully!',todoId:deletedTodo._id}
   } catch (error) {
     return {errorMsg:'Something went wrong!'}
   }

}

export const completeTodo=async(userId,todoTitle,taskCompleted)=>{
   try {
     const user=await User.findById(userId).select('-notes -refreshToken -createdAt -updatedAt')
     if(!user){
         return {errorMsg:'User Not Found!'}
     }
     if(taskCompleted===true){
         user.todos.filter(todo=>todo.title===todoTitle)[0].completed=true
     }
     else{
         user.todos.filter(todo=>todo.title===todoTitle)[0].completed=false
     }
      const updatedTodo=user.todos.filter(todo=>todo.title===todoTitle)[0]
     await user.save({validateBeforeSave:false})
     return {message:'Todo Updated Successfully!',todoId:updatedTodo._id,completed:taskCompleted}
   } catch (error) {
     return {errorMsg:'Something went wrong!'}
    
   }
}
