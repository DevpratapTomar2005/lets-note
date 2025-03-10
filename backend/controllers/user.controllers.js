import User from '../models/userSchema.js'
import sendNotifications from '../utils/notificationService.js'
import schedule from 'node-schedule'


const createTodo=async(req,res)=>{
    const {todoData}=req.body.todoData
    
   try {
     const user=await User.findById(req.user.id)
     if(!user){
         return res.status(400).json({message:'User not found!'})
     }
     const newTodo={
        title:todoData.title,
        dueDate:todoData.dueDate,
        notifyMe:todoData.notifyMe,
        notificationTime:todoData.notificationTime,
        completed:false
    }
    user.todos.push(newTodo)
    await user.save({validateBeforeSave:false})

    if(todoData.notifyMe && todoData.deviceToken){
        const scheduledDate = new Date(`${todoData.dueDate} ${todoData.notificationTime}`)
        try {
            const job=schedule.scheduleJob(scheduledDate,async()=>{
                
              const response=  await sendNotifications(todoData.deviceToken,todoData.title,'You have a task due!!')
                
            });
            
        } catch (error) {
            return res.status(500).json({message:'Notification not sent!'})
        }
    }

     return res.status(201).json({message:'Todo Created Successfully!',todo:newTodo})
   } catch (error) {
    return res.status(500).json({message:'Something went wrong!'})
   }

}

export default {
    
    createTodo
}