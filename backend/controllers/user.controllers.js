import User from '../models/userSchema.js'

const getUser=(req,res)=>{
    try {
        return res.status(200).json({user:req.user,message:'User fetched successfuly!'})
        
    } catch (error) {
        return res.status(500).json({message:'Something went wrong!'})
    }
}

const createTodo=async(req,res)=>{
    const {todoData}=req.body.todoData
    
   try {
     const user=await User.findById(req.user.id)
     if(!user){
         return res.status(400).json({message:'User not found!'})
     }
     const newTodo={...todoData,completed:false}
    user.todos.push(newTodo)
    await user.save({validateBeforeSave:false})
     return res.status(201).json({message:'Todo Created Successfully!',todo:newTodo})
   } catch (error) {
    return res.status(500).json({message:'Something went wrong!'})
   }

}

export default {
    getUser,
    createTodo
}