const mongoose = require('mongoose')

let databaseConnected = false

const connectDB = async () => {
    const connectionString = process.env.CONNECTION_STRING

    if (!connectionString) {
        console.log("CONNECTION_STRING is missing. Using local auth fallback.")
        return false
    }

    try {
        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 5000
        })
        databaseConnected = true
        console.log("Database Connected Successfully")
        return true
    } catch (err) {
        databaseConnected = false
        console.log("Connection Failed. Using local auth fallback.", err.message)
        return false
    }
}

const isDatabaseConnected = () => databaseConnected && mongoose.connection.readyState === 1

module.exports = { connectDB, isDatabaseConnected }
