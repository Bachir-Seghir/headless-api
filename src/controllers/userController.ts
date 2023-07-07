import { Response, Request } from 'express'
import User, { IUser } from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Get all Users 

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = User.find()
        res.status(200).json(users)
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Server Error' })
    }
}

// Get User by Email
export const getUserByEmail = (email: string) => User.findOne({ email })

// Get User by ID

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.body

        const user = User.findById(id)

        if (!user) {
            return res.status(404).json({ message: 'User Not Found' })
        }

        res.status(200).json(user)
    } catch (error) {
        console.error('Error getting user by Id:', error);
        res.status(500).json({ message: 'Server Error' })
    }

}


// Register New User

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body

        if (!email || !username || !password) {
            return res.status(400)
        }

        // check if the email is already registred
        const existingUser = await getUserByEmail(email)

        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registred' })
        }

        // Hash the password 
        const hashedPassword = await bcrypt.hash(password, 10)

        // create new user
        const user: IUser = new User({ username, email, password: hashedPassword })
        await user.save()

        // generate JWT 
        const token = jwt.sign({ userId: user._id }, process.env.SECRET)

        // store token on a cookie
        res.cookie('jwt', token, {
            httpOnly: true
        })
        res.status(201).json({ user, token })

    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Server Error' })
    }

}