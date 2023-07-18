import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { getUserById } from '../controllers/userController'

const isOwner = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.token
    const requestedUserId = req.params.id

    if (!token) {
        return res.status(401).json({ mesage: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET) as { userId: string }
        const { userId } = decoded

        const user = await getUserById(userId)

        // check if the authenticated user is the owner of the resources being accessed
        if (user._id.toString() === userId) {
            next()
        } else {
            return res.status(403).json({ mesage: 'Unauthorized' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export default isOwner