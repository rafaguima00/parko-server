const model = require("../../model/tabela_fixa")

const getTabelaFixa = async (req, res) => {
    const id = req.params.id

    if (id) {
        const getById = await model.getTabelaFixaById(id)
        res.status(200).json(getById)
        return
    }

    const getAll = await model.getTabelaFixa()
    res.status(200).json(getAll)
}

const postTabelaFixa = async (req, res) => {
    const create = await model.createTabelaFixa(req.body)
    res.status(201).json(create)
}

const putTabelaFixa = async (req, res) => {
    const id = req.params.id
    await model.updateTabelaFixa(req.body, id)
    res.status(204).json({})
}

const deleteTabelaFixa = async (req, res) => {
    await model.deleteTabelaFixa(req.body)
    res.status(204).json({})
}

module.exports = {
    getTabelaFixa,
    postTabelaFixa,
    putTabelaFixa,
    deleteTabelaFixa
}