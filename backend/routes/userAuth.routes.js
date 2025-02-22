import express from 'express'
import userAuthControllers from '../controllers/userAuth.controllers.js'
import checkAuth from '../middlewares/checkAuth.middleware.js'

const router=express.Router()

router.post('/register',userAuthControllers.userRegister)
router.post('/login',userAuthControllers.userLogin)
router.post('/logout',checkAuth,userAuthControllers.userLogout)
router.post('/refresh-token',userAuthControllers.refreshUserToken)
router.get('/persist-user-next-visit',userAuthControllers.persistUserNextVisit)
export default router