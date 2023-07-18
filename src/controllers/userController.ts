import { Response, Request } from 'express'
import User, { IUser } from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Get all Users 

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.error('Error getting users:', error);
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
        const existingUser = await User.findOne({ email })

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
        res.cookie('token', token, {
            httpOnly: true
        })
        res.status(201).json({ user, token })

    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Server Error' })
    }

}
// Login 

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400)
        }

        // check if the email exist
        const user = await User.findOne({ email }, 'password + username')

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials !' })
        }

        // compare passwords 
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials !' })
        }

        // generate JWT 
        const token = jwt.sign({ userId: user._id }, process.env.SECRET)

        // store token on a cookie
        res.cookie('token', token, {
            httpOnly: true
        })
        res.status(201).json({ user, token })

    } catch (error) {
        console.error('Error Login:', error);
        return res.status(500).json({ message: 'Server Error' })
    }

}

// get user by ID 
export const getUserById = (id: string) => User.findById(id)

// get user by email
export const getUserByEmail = (email: string) => User.findOne({ email })