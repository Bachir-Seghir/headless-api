import { Response, Request } from 'express'
import User, { IUser } from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Register New User
export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password, isAdmin } = req.body

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
        const user: IUser = new User({
            username,
            email,
            password: hashedPassword,
            role: isAdmin ? 'admin' : 'user'
        })
        await user.save()

        // generate JWT 
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1d' })

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
        const user = await User.findOne({ email }, 'password + username + role + email')

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials !' })
        }

        // compare passwords 
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials !' })
        }

        // generate JWT 
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1d' })

        // store token on a cookie
        res.cookie('token', token, {
            httpOnly: true
        })
        res.status(201).json({ token, username: user.username, role: user.role })

    } catch (error) {
        console.error('Error Login:', error);
        return res.status(500).json({ message: 'Server Error' })
    }
}