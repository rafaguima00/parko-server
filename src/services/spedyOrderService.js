require("dotenv").config()

const axios = require("axios")

const criarVendaSpedy = async (reserva) => {

    const { id, value, payment_method, name, email, cpf, nome_estacionamento } = reserva

    const payload = {
        transactionId: `RESERVA-${id}`,
        date: new Date().toISOString(),
        amount: value,
        autoIssueMode: "immediately",
        status: "approved",
        paymentMethod: mapPaymentMethod(payment_method),
        sendEmailToCustomer: true,
        customer: {
            name,
            federalTaxNumber: cpf,
            email
        },
        items: [
            {
                quantity: 1,
                price: value,
                amount: value,
                product: {
                    name: `Reserva de vaga - ${nome_estacionamento}`,
                    code: `VAGA-${id}`,
                    price: value
                }
            }
        ]
    }

    console.log(payload)

    try {

        const response = await axios.post(
            process.env.SPEDY_API_URL,
            payload,
            {
                headers: {
                    'X-Api-Key': process.env.SPEDY_API_KEY,
                    'Content-Type': 'application/json',
                },
                timeout: 10000
            }
        )

        console.log(response.data)
        return response.data
        
    } catch (error) {
        console.log(error.response.data)
    }
}

function mapPaymentMethod(metodo) {
    const map = { 
        pix: 'pix', 
        credit_card: 'creditCard', 
        debit_card: 'debitCard' 
    }

    return map[metodo] || 'other'
}

module.exports = {
    criarVendaSpedy
}