const model = require("../../model/debts")

const getDebts = async (req, res) => {
    const getDebts = await model.getDebts()
    res.status(200).json(getDebts)
}

const getSelectedDebt = async (req, res) => {
    const id = req.params.id
    const getDebt = await model.getDebtsByOwnerId(id)
    res.status(200).json(getDebt)
}

const postDebts = async (req, res) => {
    const postDebt = await model.createDebt(req.body)
    res.status(200).json(postDebt)
}

const deleteDebts = async (req, res) => {
    const id = req.params.id
    await model.deleteDebt(id)
    res.status(204).json({})
}

const putDebts = async (req, res) => {
    const id = req.params.id
    const result = await model.updateDebt(req.body, id)
    res.status(200).json(result)
}

module.exports = {
    getDebts,
    getSelectedDebt,
    postDebts, 
    deleteDebts, 
    putDebts
}