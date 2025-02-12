import { generateUserAccessToken,generateUserRefreshToken } from "../utils/generateUserTokens.js"
import User from '../models/userSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userRegister=async (req,res)=>{
    const {fullname,email,password}=req.body
   
   try {
     const userExists=await User.findOne({fullname:fullname,email:email}).select('-refreshToken -todos -notes -createdAt -updatedAt')
    
     if(userExists){
        
     return res.status(400).json({message:"User already exists! Try to login"})
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
            return res.status(400).json({message:"User doesn't exist! Try to register"})
        }
        if(!await bcrypt.compare(password,user.password)){
            return res.status(400).json({message:"Invalid credentials"})
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

const userLogout=async (req,res)=>{
   try {
     await User.findByIdAndUpdate(req.user._id,{$set:{refreshToken:""}})
     return res.status(201).clearCookie('current_session_token',{ httpOnly: true,secure: true,sameSite: 'Strict'}).clearCookie('max_session_token',{ httpOnly: true,secure: true,sameSite: 'Strict'}).json({message:"Logged out successfully!"})
   } catch (error) {
    return res.status(500).json({message:"Internal server error"})
   }
}

const refreshUserToken=async (req,res)=>{
    const refreshToken=req.cookies.max_session_token
try {
    
        if(!refreshToken){    
            return res.status(400).json({message:"Unauthorized user"})
        }
    
        const decodedToken= jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    
        const user=await User.findById(decodedToken.id).select('-todos -notes -createdAt -updatedAt')
    
        if(!user){
            return res.status(400).json({message:"Invalid Token"})
        }
        if(user.refreshToken!==refreshToken){
            return res.status(400).json({message:"Invalid Token"})
        }
    
        const accessToken=generateUserAccessToken(user)
        return res.status(201).cookie('current_session_token',accessToken,{ httpOnly: true,secure: true,sameSite: 'Strict'}).json({message:"Token refreshed successfully!"})
} catch (error) {
    return res.status(500).json({message:"Internal server error"})
}
}
export default {
    userRegister,
    userLogin,
    userLogout,
    refreshUserToken
}
