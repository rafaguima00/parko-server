const model = require("../../model/ajuda")

const getFaq = async (req, res) => {
    const result = await model.getFrequentlyAskedQuestions()
    res.status(200).json(result)
}

module.exports = {
    getFaq
}