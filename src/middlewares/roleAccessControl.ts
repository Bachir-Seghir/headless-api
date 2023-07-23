import { Request as ExpressRequest, Response, NextFunction } from 'express'
import { Role } from '../security/roles';

interface Request extends ExpressRequest {
    user?: any
}

export const checkUserRole = (roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;
        console.log(userRole);
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ message: "Forbidden" })
        }


        // user has the required role, proceed to the route handler
        next()
    }
} 