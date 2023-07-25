import { Request as ExpressRequest, Response, NextFunction } from 'express'

interface Request extends ExpressRequest {
    user?: any
}

const isOwner = async (req: Request, res: Response, next: NextFunction) => {

    const requestedUserId = req.params.id
    const authenticatedUserId = req.user?._id.toString()

    try {
        // check if the authenticated user is the owner of the resources being accessed
        if (authenticatedUserId === requestedUserId) {
            next()
        } else {
            return res.status(403).json({ message: 'Forbidden - You are not allowed to access this ressource' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export default isOwner