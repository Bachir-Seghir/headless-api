import { Request as ExpressRequest, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { getUserById } from '../controllers/userController'

interface Request extends ExpressRequest {
    user?: any
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token


    if (!token) {
        return res.status(401).json({ mesage: 'Not Authenticated' })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET) as { userId: string }
        const { userId } = decoded

        const user = await getUserById(userId)
        req.user = user
        next()
    } catch (error) {
        console.log('Authentication Error : ', error);
        res.status(401).json({ mesage: 'Unauthorized' })
    }
}

export default authenticate