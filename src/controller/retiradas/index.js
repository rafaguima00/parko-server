const model = {
    retiradas: require("../../model/retiradas")
};

const getRetiradas = async (req, res) => {
    const result = await model.retiradas.getRetiradas();
    
    res.status(200).json(result);
};

const postRetiradas = async (req, res) => {
    try {
        const create = await model.retiradas.postRetiradas(req.body);
        res.status(201).json(create);
    } catch (error) {
        res.status(500).json(error)
    }
};

const deleteRetiradas = async (req, res) => {
    const id = req.params.id;
    await model.retiradas.deleteRetiradas(id);

    res.status(204).json({});
};

module.exports = {
    getRetiradas,
    postRetiradas,
    deleteRetiradas
};