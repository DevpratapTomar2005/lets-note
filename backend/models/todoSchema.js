import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    notifyMe: {
      type: Boolean,
      default: false,
    },
    notificationTime: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    
  },{ timestamps: true })
  
 
  
  export default todoSchema