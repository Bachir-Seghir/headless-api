import { Request as ExpressRequest, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { getUserById } from '../controllers/userController'
import { Role } from '../security/roles'

interface Request extends ExpressRequest {
    user?: any
}

const isOwner = async (req: Request, res: Response, next: NextFunction) => {

    const requestedUserId = req.params.id
    const authenticatedUserId = req.user?._id.toString()
    const authenticatedUserRole = req.user?.role

    try {
        // check if the authenticated user is the owner of 
        // the resources being accessed or he has an ADMIN role
        if (authenticatedUserId === requestedUserId || authenticatedUserRole === Role.ADMIN) {
            next()
        } else {
            return res.status(403).json({ mesage: 'Forbidden - You are not allowed to access this ressource' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export default isOwner