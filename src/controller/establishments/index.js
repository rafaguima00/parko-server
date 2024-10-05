const model = require("../../model/establishments")

const getEstablishments = async (req, res) => {
    const getEstablishment = await model.getEstablishment()
    res.status(200).json(getEstablishment)
}

const getEstablishmentById = async (req, res) => {
    const id = req.params.id
    const getById = await model.getEstablishmentById(id)
    res.status(200).json(getById)
}

const getColaboratorsByEst = async (req, res) => {
    const id = req.params.id
    const getAll = await model.getEstByColaborator(id)
    res.status(200).json(getAll)
}

const createEstablishment = async (req, res) => {
    const create = await model.postEstablishment(req.body)
    res.status(201).json(create)
}   

const deleteEstablishment = async (req, res) => {
    const id = req.params.id
    await model.deleteEstablishment(id)

    res.status(204).json({})
}

const updateEstablishment = async (req, res) => {
    const id = req.params.id
    await model.patchEstablishment(id, req.body)

    res.status(204).json({})
}

const updateVagasOcupadas = async (req, res) => {
    const id = req.params.id
    await model.putVagasOcupadas(id, req.body)

    res.status(204).json({})
}

module.exports = {
    getEstablishments,
    getEstablishmentById,
    getColaboratorsByEst,
    createEstablishment,
    deleteEstablishment,
    updateEstablishment,
    updateVagasOcupadas
}