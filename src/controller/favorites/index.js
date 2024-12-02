const model = require("../../model/favorites")

const getFavorites = async (req, res) => {
    const getAll = await model.getFavorites(req.params.id)
    res.status(200).json(getAll)
}

const postFavorites = async (req, res) => {
    const postIt = await model.createFavorites(req.body)
    res.status(201).json(postIt)
}

const deleteFavorites = async (req, res) => {
    try {
        await model.deleteFavorites(req.body)
        res.status(200).json({ message: "Estacionamento removido dos favoritos" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao remover item dos favoritos" })
    }
}

module.exports = {
    getFavorites,
    postFavorites,
    deleteFavorites
}