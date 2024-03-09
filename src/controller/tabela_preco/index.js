const model = require("../../model/tabela_preco");

const getPriceTable = async (req, res) => {
    const result = await model.getPriceTable();

    res.status(200).json(result);
};

const getPriceTableById = async (req, res) => {
    const id = req.params.id;
    const result = await model.getPriceTableById(id);

    res.status(200).json(result);
};

const postPriceTable = async (req, res) => {
    const create = await model.createPriceTable(req.body);

    res.status(201).json(create);
};

const putPriceTable = async (req, res) => {
    const id = req.params.id;

    await model.updatePriceTable(req.body, id);
    res.status(204).json({});
};

const deletePriceTable = async (req, res) => {
    const id = req.params.id;

    await model.deletePriceTable(id);
    res.status(204).json({});
};

module.exports = {
    getPriceTable,
    getPriceTableById,
    postPriceTable,
    putPriceTable,
    deletePriceTable
};