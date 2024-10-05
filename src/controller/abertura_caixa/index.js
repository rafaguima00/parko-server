const model = require("../../model/abertura_caixa")

const getAberturaCx = async (req, res) => {
    const getAll = await model.getAberturaCx()
    res.status(200).json(getAll)
}

const getAberturaCxById = async (req, res) => {
    const id = req.params.id
    const getAll = await model.getAberturaCxById(id)

    res.status(200).json(getAll)
}

const getAberturaCxByPark = async (req, res) => {
    const id = req.params.id
    const getAll = await model.getAberturaCxByPark(id)

    res.status(200).json(getAll)
}

const postAberturaCx = async (req, res) => {
    const create = await model.abrirCaixa(req.body)
    res.status(201).json(create)
}

const updateAberturaCx = async (req, res) => {
    const id = req.params.id
    await model.updateCaixa(id, req.body)

    res.status(204).json({})
}

const deleteAberturaCx = async (req, res) => {
    const id = req.params.id
    await model.deleteCaixa(id)

    res.status(204).json({})
}

module.exports = {
    getAberturaCx,
    getAberturaCxById,
    getAberturaCxByPark,
    postAberturaCx,
    updateAberturaCx,
    deleteAberturaCx
}