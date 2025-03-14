import express from 'express'
import checkAuth from '../middlewares/checkAuth.middleware.js'
import userControllers from "../controllers/user.controllers.js";
const router=express.Router()


router.post('/create-todo',checkAuth,userControllers.createTodo)
router.post('/delete-todo',checkAuth,userControllers.deleteTodo)
export default router