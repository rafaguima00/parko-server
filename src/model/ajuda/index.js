const connection = require("../model")

const getFrequentlyAskedQuestions = async () => {
    const query = "SELECT * FROM faq"
    const [items] = await connection.execute(query)

    return items
}

module.exports = {
    getFrequentlyAskedQuestions
}