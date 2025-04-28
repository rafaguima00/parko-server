const model = require("../../model/privacy-policy")

const getPrivacyPolicy = async (req, res) => {
    const result = await model.getPrivacyPolicy()
    res.status(200).json(result)
}

module.exports = {
    getPrivacyPolicy
}