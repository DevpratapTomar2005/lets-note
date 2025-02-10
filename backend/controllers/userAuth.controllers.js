import { generateUserAccessToken,generateUserRefreshToken } from "../utils/generateUserTokens.js"
import User from '../models/userSchema.js'
import bcrypt from 'bcryptjs'

const userRegister=async (req,res)=>{
    const {fullname,email,password}=req.body
   
   try {
     const userExists=await User.findOne({fullname:fullname,email:email}).select('-refreshToken -todos -notes -createdAt -updatedAt')
    
     if(userExists){
        
     return res.status(202).json({message:"User already exists! Try to login"})
     }
     const hashedPassword= await bcrypt.hash(password,10)
     const user=await User.create({
         fullname,email,password:hashedPassword
     })
 
     const accessToken=generateUserAccessToken(user)
     const refreshToken=generateUserRefreshToken(user)
     user.refreshToken=refreshToken
     await user.save({validateBeforeSave:false})
     
   
     return res.status(201).cookie('current_session_token',accessToken,{ httpOnly: true,secure: true,sameSite: 'Strict'}).cookie('max_session_token',refreshToken,{ httpOnly: true,secure: true,sameSite: 'Strict'}).json({message:"User registered successfully!"})
    
    
   } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal server error"})
   }
}

const userLogin=async (req,res)=>{
    const {email,password}=req.body
    
    try {
        const user = await User.findOne({email:email}).select('-refreshToken -todos -notes -createdAt -updatedAt')
        if(!user){
            return res.status(203).json({message:"User doesn't exist! Try to register"})
        }
        if(!await bcrypt.compare(password,user.password)){
            return res.status(200).json({message:"Invalid credentials"})
        }
        const accessToken=generateUserAccessToken(user)
        const refreshToken=generateUserRefreshToken(user)
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        
         return res.status(201).cookie('current_session_token',accessToken,{ httpOnly: true,secure: true,sameSite: 'Strict'}).cookie('max_session_token',refreshToken,{ httpOnly: true,secure: true,sameSite: 'Strict'}).json({message:"User logined successfully!"})
        
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}
export default {
    userRegister,
    userLogin
}
