import express from 'express'
import { register, login, deleteUserById, updateMe } from '../controllers/userController'
import isOwner from '../middlewares/isOwner'
import authenticate from '../middlewares/authenticate'
import { checkUserRole } from '../middlewares/roleAccessControl'
import { Role } from '../security/roles'

const router = express.Router()

// Routes that do not require authentication or ownership verification
router.post('/register', register)
router.post('/login', login)

// Middleware to apply authenticate and isOwner to the following routes
router.use(authenticate, isOwner)

// Routes that require authentication and ownership verification
router.delete('/:id', deleteUserById)
router.put('/:id', updateMe)



export default router