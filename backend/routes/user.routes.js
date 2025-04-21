import express from 'express'
import checkAuth from '../middlewares/checkAuth.middleware.js'
import userControllers from "../controllers/user.controllers.js";
import upload from '../middlewares/upload.middleware.js'
const router=express.Router()


router.post('/create-todo',checkAuth,userControllers.createTodo)
router.post('/delete-todo',checkAuth,userControllers.deleteTodo)
router.post('/task-completed',checkAuth,userControllers.taskCompleted)
router.post('/create-note',checkAuth,userControllers.createNote)
router.post('/delete-note',checkAuth,userControllers.deleteNote)
router.post('/update-note',checkAuth,userControllers.editNote)
router.post('/upload-content-img',checkAuth,upload.single('tinyMCEImg'),userControllers.uploadContentImg)
router.post('/upload-pfp',checkAuth,upload.single('pfp'),userControllers.uploadPfp)
export default router