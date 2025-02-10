import express from 'express'
import userAuthControllers from '../controllers/userAuth.controllers.js'
const app=express()
const router=express.Router()

router.post('/register',userAuthControllers.userRegister)
router.post('/login',userAuthControllers.userLogin)

export default router