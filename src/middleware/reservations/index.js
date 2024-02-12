const validateBody = (req, res, next) => {
    
    const { data_entrada, hora_entrada, data_saida, hora_saida } = req.body;

    if(
        data_entrada === "",
        hora_entrada === "",
        data_saida === "",
        hora_saida === ""
    ) {
        return res.status(400).json({ message: "The field cannot be empty" })
    }

    if(
        data_entrada === undefined,
        hora_entrada === undefined,
        data_saida === undefined,
        hora_saida === undefined
    ) {
        return res.status(400).json({ message: "The field is required" })
    }

    next();
}

module.exports = {
    validateBody
};