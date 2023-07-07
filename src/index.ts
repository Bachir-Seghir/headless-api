import express from 'express'
import userRoutes from './routes/userRoutes'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './config/db'

dotenv.config();

const app = express()
const port = 3000

// Middlewares
app.use(cors({
    credentials: true
}))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

//Routes

app.use('/api', userRoutes)
//creating the HTTP Server
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})

// connect to mongoDB database
connectDB();
