import mongoose from 'mongoose'

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    default:""
  },
 
},{ timestamps: true })



export default notesSchema