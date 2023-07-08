import express, { Request as ExpressRequest, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { IUser } from 'models/userModel'

interface Request extends ExpressRequest {
    user?: any
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt


    if (!token) {
        return res.status(401).json({ mesage: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET)

        req.user = decoded
        next()
    } catch (error) {
        console.log('Authentication Error : ', error);
        res.status(401).json({ mesage: 'Unauthorized' })
    }
}

export default authenticate