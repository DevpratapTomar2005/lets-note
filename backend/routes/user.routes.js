import express from 'express'
import checkAuth from '../middlewares/checkAuth.middleware.js'
import userControllers from "../controllers/user.controllers.js";
const router=express.Router()

router.get('/get-user',checkAuth,userControllers.getUser)
router.post('/create-todo',checkAuth,userControllers.createTodo)
export default router