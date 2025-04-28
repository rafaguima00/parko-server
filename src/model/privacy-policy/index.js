const connection = require("../model")

const getPrivacyPolicy = async () => {
    const query = "SELECT * FROM privacy_policy"
    const [items] = await connection.execute(query)
    return items
}

module.exports = {
    getPrivacyPolicy
}