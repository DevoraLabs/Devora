require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const startupRouter = require('./routes/startupRoutes')
const followRouter = require('./routes/followRoutes')
const authMiddleware = require('./middlewares/authMiddleware')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true                
}));
app.use("/auth", authRouter)
app.use("/user", authMiddleware, userRouter)
app.use("/startups", authMiddleware, startupRouter)
app.use("/follow", authMiddleware, followRouter)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()