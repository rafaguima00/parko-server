const model = require("../../model/occurrence")

const getOccurrence = async (req, res) => {
    const getAll = await model.getOccurrence()
    res.status(200).json(getAll)
}

const postOccurrence = async (req, res) => {
    const createItem = await model.createOccurrence(req.body)
    res.status(201).json(createItem)

}

const putOccurrence = async (req, res) => {
    const id = req.params.id
    
    await model.updateOccurrence(req.body, id)
    res.status(204).json({})
}

const deleteOccurrence = async (req, res) => {
    const id = req.params.id

    await model.deleteOccurrence(id)
    res.status(204).json({})
}

module.exports = {
    getOccurrence,
    postOccurrence,
    putOccurrence,
    deleteOccurrence
}