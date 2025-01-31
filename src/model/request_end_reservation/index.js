const connection = require("../model")

const getAllRequest = async (id) => {
    if(id) {
        const query = `
            SELECT 
                r.*,
                s.hora_entrada,
                s.hora_saida,
                s.data_entrada,
                s.data_saida,
                s.value,
                s.status_reservation,
                s.parko_app,
                u.name, 
                u.tel,
                u.email, 
                v.name as name_vehicle,
                v.color,
                v.license_plate
            FROM request_end_reservation r
            INNER JOIN reservations s ON s.id = r.id_reservation
            INNER JOIN vehicles v ON v.id = r.id_vehicle
            INNER JOIN users u ON u.id = r.id_customer
            WHERE r.id_establishment = ?
        `
    
        const [items] = await connection.execute(query, [id])
        return items
    }
}

const createRequest = async (body) => {

    const { 
        id_customer, 
        id_reservation, 
        id_establishment, 
        id_vehicle 
    } = body

    const query = `
        INSERT INTO request_end_reservation (
            id_customer, 
            id_reservation, 
            id_establishment,
            id_vehicle
        ) VALUES (?, ?, ?, ?)
    `
    const values = [id_customer, id_reservation, id_establishment, id_vehicle]

    await connection.execute(query, values)
}

const updateReq = async (body) => {

    for(const updateRequest of body) {
        
        const { id } = updateRequest

        const date = new Date().toLocaleString()
        const query = `
            UPDATE request_end_reservation SET notified = 1, updated_at = ? WHERE id = ?
        `
        const values = [date, id]

        await connection.execute(query, values)

    }
}

module.exports = {
    getAllRequest,
    createRequest,
    updateReq
}