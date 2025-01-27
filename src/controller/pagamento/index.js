require("dotenv").config()

const { default: axios } = require("axios")
const { v4: uuidv4 } = require("uuid")

const pagamento = async (req, res) => {
    const {
        token,
        transaction_amount,
        customer_id,
        description,
        payment_method_id,
        issuer_id
    } = req.body

    const idempotencyKey = uuidv4()

    // Create the request object
    const body = {
        token: token,
        transaction_amount: transaction_amount,
        description: description,
        installments: 1,
        payment_method_id: payment_method_id,
        payer: {
            id: customer_id
        },
        issuer_id: issuer_id,
        statement_descriptor: "PARKOESTACIONAMENTOS"
    }

    const requestOptions = {
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        idempotencyKey: idempotencyKey
    }

    try {
        const response = await axios.post(
            'https://api.mercadopago.com/v1/payments',
            body,
            requestOptions
        )
        res.status(200).json(response.data)
    } catch (error) {
        res.status(400).json(error.response?.data || error.message)
    }
}

module.exports = {
    pagamento
}
