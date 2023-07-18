import express from 'express'
import { register, login, getAllUsers, deleteUserById } from '../controllers/userController'
import isOwner from '../middlewares/isOwner'
import authenticate from '../middlewares/authenticate'
import { checkUserRole } from '../middlewares/roleAccessControl'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', authenticate, checkUserRole(['admin', 'manager']), getAllUsers)
router.delete('/:id', authenticate, isOwner, deleteUserById)



export default router