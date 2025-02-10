import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },{ timestamps: true })
  
 
  
  export default todoSchema