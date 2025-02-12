import jwt from 'jsonwebtoken'
import User from '../models/userSchema.js'
const checkAuth=async(req,res,next)=>{
    const accessToken=req.cookies.current_session_token
    
   try {
     if(!accessToken){
         return res.status(400).json({message:"Unauthorized user"})
     }
    const decodedToken= jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)

     const user=await User.findById(decodedToken.id).select('-refreshToken -todos -notes -createdAt -updatedAt')
     if(!user){
         return res.status(400).json({message:"Invalid Token"})
     }
     req.user=user
     next()
   } catch (error) {
  
    if(error.name==="TokenExpiredError"){
        return res.status(401).json({message:"Token expired"})
    }
    return res.status(500).json({message:"Internal server error"})
   }
}

export default checkAuth;