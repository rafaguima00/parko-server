const model = {
    aportes: require("../../model/aportes")
};

const getAportes = async (req, res) => {
    const result = await model.aportes.getAportes();
    
    res.status(200).json(result);
};

const postAportes = async (req, res) => {
    const create = await model.aportes.postAportes(req.body);

    res.status(201).json(create);
};

const deleteAportes = async (req, res) => {
    const id = req.params.id;
    await model.aportes.deleteAportes(id);

    res.status(204).json({});
};

module.exports = {
    getAportes,
    postAportes,
    deleteAportes
};