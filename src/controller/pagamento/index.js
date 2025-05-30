require("dotenv").config()

const model = require("../../model/pagamento")
const axios = require("axios")
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
        statement_descriptor: "PARKO_ESTACIONAMENTOS"
    }

    try {
        const response = await axios.post(
            "https://api.mercadopago.com/v1/payments",
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    "X-Idempotency-Key": idempotencyKey
                }
            }
        )

        res.status(200).json(response.data)
    } catch (error) {
        res.status(400).json({
            error: error.response?.data || "Erro no pagamento"
        })
    }
}

const getPayment = async (req, res) => {
    const result = await model.selectPayment(req.params.id)
    res.status(200).json(result)
}

const savePaymentOnDB = async (req, res) => {
    const create = await model.createPayment(req.body)
    res.status(200).json(create)
}

module.exports = {
    pagamento,
    getPayment,
    savePaymentOnDB
}
