import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnect from './db/connectDb.js'
import userAuthRoutes from './routes/userAuth.routes.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

//connecting databse
dbConnect()

app.use(cors(
  {origin: 'http://localhost:5173', 
  credentials: true}
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//All routes
app.use('/api/auth',userAuthRoutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})