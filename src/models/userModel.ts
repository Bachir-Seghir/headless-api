import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    username: string
    email: string
    password: string
    jwt: string
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    jwt: {
        type: String,
    }
})

export default mongoose.model<IUser>('User', UserSchema)