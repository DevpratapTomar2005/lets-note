import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnect from './db/connectDb.js'
import userAuthRoutes from './routes/userAuth.routes.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

//connecting databse
dbConnect()
app.use(cookieParser())
app.use(cors(
  {origin: process.env.CLIENT_URL, 
  credentials: true}
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//All routes
app.use('/api/auth',userAuthRoutes)
app.use('/api/user',userRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})