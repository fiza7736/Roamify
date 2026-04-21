require('dotenv').config()
const { connectDB } = require('./DBconnect/dbConnect')
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')

const backend = express()
backend.use(cors())
backend.use(express.json())
backend.use(router)

const PORT = process.env.PORT || 3000

const startServer = async () => {
    await connectDB()
    backend.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
    })
}

startServer()

