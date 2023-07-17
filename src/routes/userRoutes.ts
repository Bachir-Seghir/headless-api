import express from 'express'
import { register, login, getAllUsers, getUserById } from '../controllers/userController'
import authenticate from '../middlewares/authenticate'
import isOwner from '../middlewares/isOwner'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', authenticate, getAllUsers)
router.get('/:id', isOwner, getUserById)


export default router