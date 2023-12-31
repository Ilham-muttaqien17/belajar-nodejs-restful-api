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
userRouter.get('/api/contacts/:contactId', contactController.getContact)
userRouter.put('/api/contacts/:contactId', contactController.updateContact)
userRouter.delete('/api/contacts/:contactId', contactController.deleteContact)

export {
    userRouter
}