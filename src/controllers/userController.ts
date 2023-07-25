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
        const token = jwt.sign({ userId: user._id }, process.env.SECRET)

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

// get user by ID 
export const getUserById = (id: string) => User.findById(id)

// get user by email
export const getUserByEmail = (email: string) => User.findOne({ email })

// Delete User by ID
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const deletedUser = await User.findOneAndDelete({ _id: id })

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.json(deletedUser)

    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error })
    }

}


// Update Me 
export const updateMe = async (req: Request, res: Response) => {
    const { id } = req.params
    const { username, password } = req.body

    // create an update object 
    const updatedUser: { username?: string, password?: string } = {}

    // Hash the password 
    let hashedPassword: string | undefined
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10)
        updatedUser.password = hashedPassword
    }
    if (username) {
        updatedUser.username = username
    }
    if (!username && !password) {
        return res.status(400).json({ message: 'Please provide the new data to be updated' })
    }
    try {
        const user = await User.findByIdAndUpdate(id, updatedUser, { new: true })
        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }

        return res.status(200).json({ message: 'User updated successfully.', user })
    } catch (error) {
        return res.status(500).json({ message: 'An occured while updating the user ', error })
    }
}

// Update User By Admin
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const newData = { ...req.body }

    // Hash the password 
    let hashedPassword: string | undefined
    if (newData.password) {
        hashedPassword = await bcrypt.hash(newData.password, 10)
        newData.password = hashedPassword
    }

    try {
        const user = await User.findByIdAndUpdate(id, newData, { new: true })
        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }

        return res.status(200).json({ message: 'User updated successfully.', user })
    } catch (error) {
        return res.status(500).json({ message: 'An occured while updating the user ', error })
    }
}