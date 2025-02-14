import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateUserAccessToken=(user)=>{
    return jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'15m'
    })
}
export const generateUserRefreshToken=(user)=>{
    return jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:'1d'
    })
}


