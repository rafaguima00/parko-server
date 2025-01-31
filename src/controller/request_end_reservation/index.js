const model = require("../../model/request_end_reservation")

const getAllRequest = async (req, res) => {
    const id = req.params.id
    const request = await model.getAllRequest(id)

    res.status(200).json(request)
}

const postRequest = async (req, res) => {
    const result = await model.createRequest(req.body)
    res.status(200).json(result)
}

const updateRequest = async (req, res) => {
    await model.updateReq(req.body)
    res.status(204).json({})
}

module.exports = {
    getAllRequest,
    postRequest,
    updateRequest
}