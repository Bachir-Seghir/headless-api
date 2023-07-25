import express from 'express'
import { deleteUserById, updateMe } from '../controllers/userController'
import isOwner from '../middlewares/isOwner'
import authenticate from '../middlewares/authenticate'

const router = express.Router()

// Middleware to apply authenticate and isOwner to the following routes
router.use(authenticate, isOwner)

// Routes that require authentication and ownership verification
router.delete('/:id', deleteUserById)
router.put('/:id', updateMe)



export default router