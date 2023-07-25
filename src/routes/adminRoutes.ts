import express from 'express'
import { getAllUsers, deleteUserById, updateUser } from '../controllers/userController'
import authenticate from '../middlewares/authenticate'
import { checkUserRole } from '../middlewares/roleAccessControl'
import { Role } from '../security/roles'

const router = express.Router()

router.use(authenticate, checkUserRole([Role.ADMIN]))

router.get('/users', getAllUsers)
router.delete('/user/:id', deleteUserById)
router.put('/user/:id', updateUser)


export default router