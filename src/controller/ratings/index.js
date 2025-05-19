const model = require("../../model/ratings")

const getRatings = async (req, res) => {
    const result = await model.getRatings()

    res.status(200).json(result)
}

const getRatingsByIdEstablishment = async (req, res) => {
    const result = await model.getRatingsByIdEstablishment(req.params.id)

    res.status(200).json(result)
}

const postRatings = async (req, res) => {
    const create = await model.createRating(req.body)
    
    res.status(201).json(create)
}

const deleteRatings = async (req, res) => {
    const { id } = req.params

    await model.deleteRating(id)
    res.status(204).json({})
}

const putRatings = async (req, res) => {
    const { id } = req.params

    await model.updateRating(req.body, id)
    res.status(204).json({})
}

module.exports = {
    getRatings,
    getRatingsByIdEstablishment,
    postRatings,
    deleteRatings,
    putRatings
}