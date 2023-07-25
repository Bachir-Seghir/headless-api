import { Response, Request } from 'express'
import User from '../models/userModel'
import bcrypt from 'bcrypt'


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