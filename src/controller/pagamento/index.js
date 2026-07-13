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
        issuer_id,
        email,
        name,
        surname,
        cpf
    } = req.body

    const idempotencyKey = uuidv4()

    const body = {
        token: token,
        transaction_amount: transaction_amount,
        description: description,
        installments: 1,
        payment_method_id: payment_method_id,
        payer: {
            type: "customer",
            id: customer_id,
            email: process.env.TEST === 1 ? "test@testuser.com" : email,
            first_name: name,
            last_name: surname,
            identification: {
                type: "CPF",
                number: cpf
            }
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
        console.error({
            timestamp: new Date().toISOString(),
            mp_error: error.response?.data,
            status_detail: error.response?.data?.status_detail,
            cause: error.response?.data?.cause
        })

        res.status(400).json({
            error: error.response?.data || "Erro no pagamento"
        })
    }
}

const getPaymentById = async (req, res) => {

    const id = req.params.id

    try {
        const response = await axios.get(
            `https://api.mercadopago.com/v1/payments/${id}`,
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
            error: error.response?.data
        })
    }
}

const refunds = async (req, res) => {

    const { amount, id_reservation } = req.body

    const id = req.params.id
    const idempotencyKey = uuidv4()

    try {
        const response = await axios.post(
            `https://api.mercadopago.com/v1/payments/${id}/refunds`,
            { amount },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    "X-Idempotency-Key": idempotencyKey
                },
                timeout: 10000
            }
        )

        res.status(200).json(response.data)
    } catch (error) {
        console.log(JSON.stringify({
            error: error.response?.data || "Erro no pagamento"
        }))
        res.status(400).json({
            error: error.response?.data || "Erro no pagamento"
        })
    }
}

const getPayment = async (req, res) => {
    const result = await model.selectPayment(req.params.id)

    res.status(200).json(result)
}

const searchPayment = async (req, res) => {
    const result = await model.searchPayment(req.params.id)

    res.status(200).json(result)
}

const savePaymentOnDB = async (req, res) => {
    const create = await model.createPayment(req.body)

    res.status(200).json(create)
}

const updatePayment = async (req, res) => {
    const result = await model.alterPayment(req.body)

    return res.status(200).json(result)
}

module.exports = {
    pagamento,
    getPayment,
    savePaymentOnDB,
    refunds,
    getPaymentById,
    searchPayment,
    updatePayment
}
