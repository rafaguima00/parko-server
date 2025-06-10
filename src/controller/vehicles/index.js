const model = require("../../model/vehicles")

const getVehicles = async (req, res) => {
    const getAll = await model.getVehicles()
    res.status(200).json(getAll)
}

const getVehiclesByOwnerId = async (req, res) => {
    const getVehicle = await model.getVehiclesByOwnerId(req.params.id)
    res.status(200).json(getVehicle)
}

const postVehicles = async (req, res) => {
    const create = await model.createVehicle(req.body)
    res.status(200).json(create)
}

const deleteVehicle = async (req, res) => {
    const deleted = await model.deleteVehicle(req.params.id)
    res.status(200).json(deleted)
}

module.exports = {
    getVehicles,
    getVehiclesByOwnerId,
    postVehicles,
    deleteVehicle
}