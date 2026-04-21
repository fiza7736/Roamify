const jwt = require('jsonwebtoken')
const { createUser, findUserByEmail } = require('../Repositories/userRepository')

exports.registerController = async (req, res) => {
    const { name, email, password } = req.body
    const trimmedName = name?.trim()
    const normalizedEmail = email?.trim().toLowerCase()

    try {
        if (!trimmedName || !normalizedEmail || !password) {
            return res.status(400).json("Please fill the form completely")
        }

        const existingUser = await findUserByEmail(normalizedEmail)
        if (existingUser) {
            return res.status(406).json("User already exists")
        }

        const newUser = await createUser({
            name: trimmedName,
            email: normalizedEmail,
            password
        })

        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            userType: newUser.userType
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.loginController = async (req, res) => {
    const { email, password } = req.body
    const normalizedEmail = email?.trim().toLowerCase()

    try {
        if (!normalizedEmail || !password) {
            return res.status(400).json("Please enter your email and password")
        }

        const existingUser = await findUserByEmail(normalizedEmail)

        if (!existingUser) {
            return res.status(409).json("No User Found For This Email")
        }

        if (existingUser.password !== password) {
            return res.status(403).json("Invalid Password")
        }

        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email, userType: existingUser.userType },
            process.env.JWT_SECRET || "roamify-dev-secret",
            { expiresIn: "24h" }
        )

        res.status(200).json({
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                userType: existingUser.userType
            },
            token
        })

    }
    catch (err) {
        res.status(500).json("Login failed. Please try again.")
    }

}
