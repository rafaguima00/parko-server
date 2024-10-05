const validarAporte = async (req, res, next) => {
    const { created_at, value, description } = req.body

    if(
        (created_at === "" ||
        value === "" ||
        description === "" )
    ) {
        return res.status(401).json({ message: "Preencha o campo vazio" })
    }

    if(
        (created_at === undefined ||
        value === undefined ||
        description === undefined )
    ) {
        return res.status(401).json({ message: "Preencha o campo vazio" })
    }

    next()
}

module.exports = {
    validarAporte
}