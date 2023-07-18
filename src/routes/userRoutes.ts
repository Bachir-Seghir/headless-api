import express from 'express'
import { register, login, getAllUsers } from '../controllers/userController'
import isOwner from '../middlewares/isOwner'
import authenticate from '../middlewares/authenticate'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', authenticate, isOwner, getAllUsers)


export default router