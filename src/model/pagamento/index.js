const connection = require("../model")

const selectPayment = async (id) => {
    const query = `
        SELECT * FROM payments WHERE id_establishment = ?
    `
    const [items] = await connection.execute(query, [id])

    return items
}

const searchPayment = async (id) => {
    const query = `
            SELECT * FROM payments WHERE id_reservation = ?
        `
    const [items] = await connection.execute(query, [id])

    return items
}

const alterPayment = async (body) => {

    const { value_refunded, id_payment, id_reservation } = body

    const query = `
        UPDATE payments SET status = "refunded", value_refunded = ? WHERE id_payment = ?
    `

    const paymentUpdated = await connection.execute(query, [value_refunded, id_payment])

    if (paymentUpdated[0].affectedRows === 1) {
        const query = `
            UPDATE reservations SET status_reservation = 5 WHERE id = ?
        `

        await connection.execute(query, [id_reservation])
    }
}

const createPayment = async (body) => {

    for (const payment of body){

        const { 
            id_customer, 
            id_vehicle, 
            id_establishment, 
            value, 
            payment_method, 
            id_payment,
            card_brand,
            id_reservation, 
            status,
            value_paid,
            change_to_pay,
            change_paid
        } = payment
    
        const dataDoDia = new Date().toLocaleDateString("pt-br")
        const hora = new Date().toLocaleTimeString("pt-br")
    
        const query = `
            INSERT INTO payments (
                id_customer, 
                id_vehicle, 
                id_establishment, 
                value, 
                data, 
                hora, 
                payment_method, 
                id_payment,
                card_brand,
                id_reservation, 
                status,
                value_paid,
                change_to_pay,
                change_paid
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
        `
    
        const values = [
            id_customer, 
            id_vehicle, 
            id_establishment, 
            value, 
            dataDoDia, 
            hora, 
            payment_method, 
            id_payment ? id_payment : "",
            card_brand ? card_brand : "",
            id_reservation, 
            status,
            value_paid,
            change_to_pay,
            change_paid
        ]
    
        await connection.execute(query, values)
    }
}

module.exports = {
    selectPayment,
    createPayment,
    searchPayment,
    alterPayment
}