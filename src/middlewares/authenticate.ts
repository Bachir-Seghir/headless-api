import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ mesage: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded
    } catch (error) {
        console.log('Authentication Error : ', error);
        res.status(401).json({ mesage: 'Forbiden' })
    }
}