import { Request as ExpressRequest, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { getUserById } from '../controllers/userController'

interface Request extends ExpressRequest {
    user?: any
}

const isOwner = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    const requestedUserId = req.user?._id

    try {
        // check if the authenticated user is the owner of the resources being accessed
        if (requestedUserId.toString() === id) {
            next()
        } else {
            return res.status(403).json({ mesage: 'Unauthorized' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export default isOwner