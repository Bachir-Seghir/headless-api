import express from 'express'
import { register, login, getAllUsers, deleteUserById } from '../controllers/userController'
import isOwner from '../middlewares/isOwner'
import authenticate from '../middlewares/authenticate'
import { checkUserRole } from '../middlewares/roleAccessControl'
import { Role } from '../security/roles'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', authenticate, checkUserRole([Role.ADMIN, Role.USER]), getAllUsers)
router.delete('/:id', authenticate, isOwner, deleteUserById)



export default router