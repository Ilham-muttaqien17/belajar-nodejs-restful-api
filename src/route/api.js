import express from 'express'
import userController from '../controller/user_controller.js'
import { authMiddleware } from '../middleware/auth_middleware.js'
import contactController from '../controller/contact_controller.js'

const userRouter = new express.Router()
userRouter.use(authMiddleware)

// User API
userRouter.get('/api/users/current', userController.getUser)
userRouter.patch('/api/users/current', userController.updateUser)
userRouter.delete('/api/users/logout', userController.logout)

// Contact API
userRouter.post('/api/contacts', contactController.createContact)

export {
    userRouter
}