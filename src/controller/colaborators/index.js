require("dotenv").config()
const model = require("../../model/colaborators")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")

const getColaborators = async (req, res) => {
    const result = await model.getColab()
    res.status(200).json(result)
}

const getColaboratorsById = async (req, res) => {
    const id = req.params.id
    const result = await model.getColaboratorById(id)
    res.status(200).json(result)
}

const postColaborators = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const result = await model.postColab(req.body, hashedPassword)
    return res.status(201).json(result)
}

const loginColaborators = async (req, res) => {
    if (req.body.email === "" || req.body.password === "") {
        return res.status(400).json({ message: "Preencha o campo vazio" })
    }

    const email = req.body.email.toLowerCase()
    const users = await model.getColab()
    const userLogin = users.find(item => item.email.toLowerCase() === email)
        
    try {
        if (await bcrypt.compare(req.body.password, userLogin.password)) {
            const token = jwt.sign({ user: userLogin }, process.env.PRIVATE_KEY, { expiresIn: 1800 })

            return res.status(201).json({ token })
        }
        
        res.status(400).json({ message: "E-mail ou senha não conferem" })
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

const deleteColaborators = async (req, res) => {
    const id = req.params.id
    await model.deleteColab(id)
    return res.status(204).json({})
}

const updateColaborators = async (req, res) => {
    const id = req.params.id
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    
    await model.putColab(id, req.body, hashedPassword)
    return res.status(204).json({})
}

const sendEmail = async (req, res) => {
    const { email } = req.body
    const textEmail = `
        <div>
            <p>Clique aqui para recuperar a senha</p>
            <a href="http://localhost:3000/new-password">Recuperar senha</a>
        </div>
    `

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "329f4273a6fb81",
          pass: "50ca71f9056cdc"
        }
    })

    transport.sendMail({
        from: "Parko <suporte@parko.com.br>",
        to: email,
        subject: "Reset de senha - Parko app",
        html: textEmail
    })
    .then(() => {
        return res.status(200).json({ message: "E-mail enviado" })
    })
    .catch(() => {
        return res.status(400).json({ message: "Erro ao enviar e-mail" })
    })
}

const forgotPassword = async (req, res) => {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    await model.forgotPassword(email, hashedPassword)
    return res.status(204).json({})
}

module.exports = {
    getColaborators,
    getColaboratorsById,
    postColaborators,
    deleteColaborators,
    updateColaborators,
    loginColaborators,
    sendEmail,
    forgotPassword
}