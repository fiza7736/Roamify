const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')
const users = require('../Models/userModel')
const { isDatabaseConnected } = require('../DBconnect/dbConnect')

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json')

const readUsersFromFile = async () => {
    try {
        const fileContent = await fs.readFile(usersFilePath, 'utf-8')
        const parsedUsers = JSON.parse(fileContent)
        return Array.isArray(parsedUsers) ? parsedUsers : []
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile(usersFilePath, '[]')
            return []
        }

        throw err
    }
}

const writeUsersToFile = async (userList) => {
    await fs.writeFile(usersFilePath, JSON.stringify(userList, null, 2))
}

const formatUser = (user) => ({
    _id: String(user._id),
    name: user.name,
    email: user.email,
    password: user.password,
    userType: user.userType || 'user'
})

const findUserByEmail = async (email) => {
    if (isDatabaseConnected()) {
        const existingUser = await users.findOne({ email }).lean()
        return existingUser ? formatUser(existingUser) : null
    }

    const storedUsers = await readUsersFromFile()
    return storedUsers.find((user) => user.email === email) || null
}

const createUser = async ({ name, email, password }) => {
    if (isDatabaseConnected()) {
        const newUser = new users({ name, email, password })
        const savedUser = await newUser.save()
        return formatUser(savedUser.toObject())
    }

    const storedUsers = await readUsersFromFile()
    const newUser = {
        _id: crypto.randomUUID(),
        name,
        email,
        password,
        userType: 'user'
    }

    storedUsers.push(newUser)
    await writeUsersToFile(storedUsers)
    return newUser
}

module.exports = { findUserByEmail, createUser }
