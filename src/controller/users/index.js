require("dotenv").config();

const model = require("../../model/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getUsers = async (req, res) => {
    const getAllUsers = await model.getUsers()
    res.status(200).json(getAllUsers)
}

const postUsers = async (req, res) => {
    if(req.body.password === "") {
        const randomPassword = Math.floor(Math.random()*900000) + 100000
        const hashedPassword = await bcrypt.hash(randomPassword.toString(), 10)
        const create = await model.postUsers(req.body, hashedPassword)
        
        res.status(201).json(create)
    } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const createUser = await model.postUsers(req.body, hashedPassword)

        res.status(201).json(createUser)
    }
}

const deleteUsers = async (req, res) => {
    const id = req.params.id
    await model.deleteUsers(id)
    return res.status(204).json({})
}

const putUsers = async (req, res) => {
    const id = req.params.id
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    await model.updateUsers(req.body, id, hashedPassword)
    return res.status(204).json({})
}

const loginUsers = async (req, res) => {
    const email = req.body.email.toLowerCase()
    const allUsers = await model.getUsers()
    const findUser = allUsers.find(item => item.email.toLowerCase() === email)

    if(findUser === null) {
        return res.status(400).json({ message: "Coudn't find any user" })
    }

    try {
        if(await bcrypt.compare(req.body.password, findUser.password)) {
            const token = jwt.sign({ user: findUser }, process.env.PRIVATE_KEY, { expiresIn: 1800 })
    
            res.status(201).json({ token })
        } else {
            return res.status(400).json({ message: "Email or password invalid" })
        }
    } catch {
        return res.status(400).json({ message: "Email or password invalid" })
    }
}

module.exports = {
    getUsers,
    postUsers,
    deleteUsers,
    putUsers,
    loginUsers
}