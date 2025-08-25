const connection = require("../model")

const selectPayment = async (id) => {

    const query = `
        SELECT * FROM payments WHERE id_establishment = ?
    `
    const [items] = await connection.execute(query, [id])
    return items
}

const createPayment = async (body) => {

    for(const payment of body){

        const { 
            id_customer, 
            id_vehicle, 
            id_establishment, 
            value, 
            payment_method, 
            id_payment,
            card_brand,
            id_reservation, 
            status 
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
                status
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
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
            status
        ]
    
        await connection.execute(query, values)
    }
}

module.exports = {
    selectPayment,
    createPayment
}