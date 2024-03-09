const model = require("../../model/horario_funcionamento");

const getOpeningHour = async (req, res) => {
    const result = await model.getOpeningHour();
    res.status(200).json(result);
};

const getOpeningHourByParking = async (req, res) => {
    const id = req.params.id;
    const result = await model.getOpeningHourByParking(id);

    res.status(200).json(result);
};

const postOpeningHour = async (req, res) => {
    const create = await model.postOpeningHour(req.body);

    res.status(201).json(create);
};

const putOpeningHour = async (req, res) => {
    const id = req.params.id;
    await model.updateOpeningHour(req.body, id);

    res.status(204).json({});
};

const deleteOpeningHour = async (req, res) => {
    const id = req.params.id;

    await model.deleteOpeningHour(id);

    res.status(204).json({});
};

module.exports = {
    getOpeningHour,
    getOpeningHourByParking,
    postOpeningHour,
    putOpeningHour,
    deleteOpeningHour
};