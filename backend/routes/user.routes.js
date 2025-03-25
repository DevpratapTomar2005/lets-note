import express from 'express'
import checkAuth from '../middlewares/checkAuth.middleware.js'
import userControllers from "../controllers/user.controllers.js";
const router=express.Router()


router.post('/create-todo',checkAuth,userControllers.createTodo)
router.post('/delete-todo',checkAuth,userControllers.deleteTodo)
router.post('/task-completed',checkAuth,userControllers.taskCompleted)
router.post('/create-note',checkAuth,userControllers.createNote)
router.post('/delete-note',checkAuth,userControllers.deleteNote)
export default router