import express from 'express'
import http from 'http'
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


//creating the HTTP Server
const server = http.createServer(app)

server.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);

})


// connect to mongoDB database
connectDB();
