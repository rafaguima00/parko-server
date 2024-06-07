const model = require("../../model/users")
const bcrypt = require("bcrypt")

const validateBody = async (req, res, next) => {
    const { email, cpf, tel } = req.body
    const getUsers = await model.getUsers()

    //verificar email existente
    const emailExists = getUsers.find(item => item.email === email)

    if(emailExists && email !== "") {
        return res.status(400).json({ message: "This e-mail exists already" })
    }
    
    //verificar cpf existente
    const cpfExists = getUsers.find(item => item.cpf === cpf)
    if(cpfExists && cpf !== "") {
        return res.status(400).json({ message: "This CPF exists already" })
    }

    //verificar número de telefone existente
    const telExists = getUsers.find(item => item.tel === tel)

    if(telExists) {
        return res.status(400).json({ message: "This phone exists already" })
    }
    
    next()
}

const updateBody = async (req, res, next) => {
    const { email, tel } = req.body

    const getUsers = await model.getUsers()

    //verificar email existente
    const emailExists = getUsers.find(item => item.email === email)

    if(emailExists) {
        return res.status(400).json({ message: "This e-mail exists already" })
    }


    //verificar número de telefone existente
    const telExists = getUsers.find(item => item.tel === tel)

    if(telExists) {
        return res.status(400).json({ message: "This phone exists already" })
    }
    
    next()
}

module.exports = {
    validateBody,
    updateBody
}