const model = require("../../model/code_confirmation")

const statusCode = async (req, res) => {
    const result = await model.verifyExistentCode(req.params.id)
    res.status(200).json(result[0])
}

const generateCode = async (req, res) => {
    const generate = await model.generateCode(req.body)

    res.status(200).json(generate)
}

const verifyCode = async (req, res) => {
    const result = await model.verifyCode(req.body)

    if(result.length == 0) {
        return res.status(400).json({ message: "Código inválido!" })
    }

    const { code: storedCode, expires_at: expiresAt } = result[0]

    if (new Date() > new Date(expiresAt)) {
        return res.status(400).json({ message: "Código expirado! Peça ao cliente para tentar finalizar a reserva novamente." })
    }

    if (storedCode !== req.body.code) {
        return res.status(400).json({ message: "Código inválido!" })
    }

    res.status(200).json({ message: "Código validado com sucesso!" })
}

module.exports = {
    generateCode,
    verifyCode,
    statusCode
}