const model = require("../../model/reservations");

const getReservations = async (req, res) => {
    const getAll = await model.getReservation();
    res.status(200).json(getAll);
}  

const postReservations = async (req, res) => {
    const create = await model.postReservation(req.body);
    res.status(201).json(create);
}

const deleteReservation = async (req, res) => {
    await model.deleteReservation(req.params.id);
    res.status(204).json({});
}

const updateReservation = async (req, res) => {
    const id = req.params.id;
    await model.putReservation(req.body, id);
    res.status(204).json({});
}

module.exports = {
    getReservations,
    postReservations,
    deleteReservation,
    updateReservation
}