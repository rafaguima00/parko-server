const model = require("../../model/reservations")

const getReservations = async (req, res) => {
    const getAll = await model.getReservation()
    res.status(200).json(getAll)
}  

const getReservationById = async (req, res) => {
    const id = req.params.id

    const result = await model.getReservationById(id)
    res.status(200).json(result)
}

const getReservByParkingId = async (req, res) => {
    const id = req.params.id

    const result = await model.getReservByParkingId(id)
    res.status(200).json(result)
}

const postReservations = async (req, res) => {
    const create = await model.postReservation(req.body)
    res.status(201).json(create)
}

const deleteReservation = async (req, res) => {
    await model.deleteReservation(req.params.id)
    res.status(204).json({})
}

const updateReservation = async (req, res) => {
    const id = req.params.id
    await model.putReservation(req.body, id)
    res.status(204).json({})
}

const updateValueReservation = async (req, res) => {
    const id = req.params.id
    await model.changeValue(req.body, id)
    res.status(204).json({})
}

module.exports = {
    getReservations,
    getReservationById,
    getReservByParkingId,
    postReservations,
    deleteReservation,
    updateReservation,
    updateValueReservation
}