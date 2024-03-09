const model = require("../../model/vehicles");

const getVehicles = async (req, res) => {
    const getAll = await model.getVehicles();
    res.status(200).json(getAll);
}

const getVehiclesByOwnerId = async (req, res) => {
    const getVehicle = await model.getVehiclesByOwnerId(req.params.id);
    res.status(200).json(getVehicle);
}

const postVehicles = async (req, res) => {
    const create = await model.createVehicle(req.body, req.body.id_costumer);
    res.status(201).json(create);
}

const deleteVehicle = async (req, res) => {
    await model.deleteVehicle(req.params.id);
    res.status(204).json({});
}

module.exports = {
    getVehicles,
    getVehiclesByOwnerId,
    postVehicles,
    deleteVehicle
}