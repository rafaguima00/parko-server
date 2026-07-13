require("dotenv").config()

const model = require("../../model/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")

const validator = require("validator")
const crypto = require('node:crypto')

const getUsers = async (req, res) => {
    const getAllUsers = await model.getUsers()
    res.status(200).json(getAllUsers)
}

const getUserById = async (req, res) => {
    const getUser = await model.getUserById(req.params.id)
    res.status(200).json(getUser)
}

const postUsers = async (req, res) => {
    try {
        if (req.body.password === "") {
            const randomPassword = Math.floor(Math.random()*900000) + 100000
            const hashedPassword = await bcrypt.hash(randomPassword.toString(), 10)
            const create = await model.postUsers(req.body, hashedPassword)
            
            res.status(200).json(create)
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const createUser = await model.postUsers(req.body, hashedPassword)
    
            res.status(200).json(createUser)
        }
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

const deleteUsers = async (req, res) => {
    const id = req.params.id
    await model.deleteUsers(id)
    return res.status(204).json({})
}

const putUsers = async (req, res) => {
    const id = req.params.id

    await model.updateUsers(req.body, id)
    return res.status(204).json({})
}

const loginUsers = async (req, res) => {
    const email = req.body.email.toLowerCase()
    const allUsers = await model.getUsers()
    const findUser = allUsers.find(item => item.email.toLowerCase() === email)

    try {
        if (!findUser) {
            return res.status(400).json({ message: "E-mail ou senha incorretos" })
        }

        if (await bcrypt.compare(req.body.password, findUser.password)) {
            const token = jwt.sign({ user: findUser }, process.env.PRIVATE_KEY, { expiresIn: 1800 })
    
            return res.status(201).json({ token })
        }
        
        return res.status(400).json({ message: "Erro ao realizar login" })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const sendEmail = async (req, res) => {
    try {
        const { email, id } = req.body

        if (!email) {
            return res.status(400).json({
                message: "E-mail obrigatório"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "E-mail inválido"
            })
        }

        const token = crypto.randomUUID()

        if (token) {
            await model.createToken(id, token)
        }

        const textEmail = `
            <div>
                <p>Clique no botão abaixo para confirmar seu cadastro:</p>

                <a
                    href="${process.env.URL_BACK_END}/confirmar/${token}"
                    style="
                        background:#2563eb;
                        color:white;
                        padding:12px 24px;
                        text-decoration:none;
                        border-radius:6px;
                        display:inline-block;
                    "
                >
                    Confirmar cadastro
                </a>
            </div>
        `

        const transport = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "api",
                pass: process.env.API_TOKEN
            }
        })

        await transport.sendMail({
            from: "Parko <suporte@parkoapp.com.br>",
            to: email,
            subject: "Confirmação de cadastro - Parko",
            html: textEmail
        })

        return res.status(200).json({
            message: "E-mail de confirmação enviado. Verifique seu e-mail"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Erro ao enviar e-mail"
        })
    }
}

const validateToken = async (req, res) => {
    const { token } = req.params

    const confirmado = await model.validateToken(token)

    res.status(200).send("Cadastro confirmado com sucesso!")
}

module.exports = {
    getUsers,
    getUserById,
    postUsers,
    deleteUsers,
    putUsers,
    loginUsers,
    sendEmail,
    validateToken
}