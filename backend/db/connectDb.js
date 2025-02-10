import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const dbConnect=async ()=>{
   try {
     await mongoose.connect(process.env.MONGODB_URI)
     console.log('DATABASE CONNECTED SUCCESSFULLY!!')
   } catch (error) {
    console.log('DATABASE CONNECTION FAILED!!')
    process.exit(1)
   }
}

export default dbConnect