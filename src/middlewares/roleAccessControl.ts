import { Request as ExpressRequest, Response, NextFunction } from 'express'

interface Request extends ExpressRequest {
    user?: any
}

export const checkUserRole = (roles: string[]) => {
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