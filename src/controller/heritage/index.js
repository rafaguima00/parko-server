const model = require("../../model/heritage");

const getHeritage = async (req, res) => {
    const getAll = await model.getHeritage();
    res.status(200).json(getAll);
}

const postHeritage = async (req, res) => {
    const createHer = await model.createHeritage(req.body)
    res.status(201).json(createHer);
}

const putHeritage = async (req, res) => {
    const id = req.params.id;

    await model.updateHeritage(req.body, id);
    res.status(204).json({});
}

const deleteHeritage = async (req, res) => {
    const id = req.params.id;

    await model.deleteHeritage(id);
    res.status(204).json({});
}

module.exports = {
    getHeritage,
    postHeritage,
    putHeritage,
    deleteHeritage
}