const model = require("../../model/accounts")

const getAccounts = async (req, res) => {
    const getAll = await model.getAccounts()
    res.status(200).json(getAll)
}

const postAccounts = async (req, res) => {
    const createAcc = await model.createAccount(req.body)
    res.status(201).json(createAcc)
}

const putAccounts = async (req, res) => {
    const id = req.params.id

    await model.updateAccount(req.body, id)
    res.status(204).json({})
}

const deleteAccount = async (req, res) => {
    const id = req.params.id

    await model.deleteAccount(id)
    res.status(204).json({})
}

module.exports = {
    getAccounts,
    postAccounts,
    putAccounts,
    deleteAccount
}