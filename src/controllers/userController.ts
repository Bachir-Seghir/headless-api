import { Response, Request } from 'express'
import UserModel, { IUser } from 'models/userModel'

// Get all Users 

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = UserModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Server Error' })
    }
}

// Get User by Email
export const getUserByEmail = (email: string) => UserModel.findOne({ email })

// Get User by SessionToken
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
})




// Get User by ID

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.body

        const user = UserModel.findById(id)

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
        const user: IUser = new UserModel({ username, email, password })

        await user.save()

        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Server Error' })
    }

}