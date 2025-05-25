import mongoose from "mongoose"
import todoSchema from "./todoSchema.js"
import notesSchema from "./notesSchema.js"
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
        default:""
    },
    todos:{
        type:[todoSchema],
        default:[]
    },
    notes:{
        type:[notesSchema],
        default:[],
        
    },
    pfpUrl:{
        type:String,
        default:""
    },
    deviceToken:{
        type:String,
        default:""
    },
},{ timestamps:true })

const User=mongoose.model("User",userSchema)
export default User