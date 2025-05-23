const connection = require("../model")

// Sempre salvar a data da reserva, entrada e saida no formato DD/MM/YYYY
const dataFormatada = (date) => {
    if(date.includes("-")) {
        const arrayData = date.split("-")

        if(arrayData[0].length == 4) {
            return `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`
        } 

        return `${arrayData[0]}/${arrayData[1]}/${arrayData[2]}`
    }

    if(date === "") return ""

    return date
}

const getReservation = async () => {
    const query = `
        SELECT 
            r.id, 
            r.data_reserva, 
            r.hora_reserva,
            r.data_entrada,
            r.hora_entrada,
            r.data_saida, 
            r.hora_saida,
            r.value,
            r.parko_app,
            r.status_reservation,
            u.id as id_costumer,
            u.name,
            u.email, 
            u.tel,
            s.status,
            v.id as id_vehicle,
            v.name as name_vehicle,
            v.color,
            v.license_plate,
            r.id_establishment,
            e.name as establishment,
            e.image as image_url_establishment,
            r.rated
        FROM reservations r
        INNER JOIN users u ON u.id = r.id_costumer 
        INNER JOIN status_reservation s ON s.id = r.status_reservation
        INNER JOIN vehicles v ON v.id = r.id_vehicle
        INNER JOIN establishments e ON e.id = r.id_establishment
    `
    const [items] = await connection.execute(query)
    return items
}

const getReservationById = async (id) => {
    const query = `
        SELECT 
            r.id, 
            r.data_reserva, 
            r.hora_reserva,
            r.data_entrada,
            r.hora_entrada,
            r.data_saida, 
            r.hora_saida,
            r.value,
            r.parko_app,
            r.status_reservation,
            u.id as id_costumer,
            u.name,
            u.email, 
            u.tel,
            s.status,
            v.id as id_vehicle,
            v.name as name_vehicle,
            v.color,
            v.license_plate,
            r.id_establishment,
            e.name as establishment,
            e.image as image_url_establishment,
            r.rated
        FROM reservations r
        INNER JOIN users u ON u.id = r.id_costumer 
        INNER JOIN status_reservation s ON s.id = r.status_reservation
        INNER JOIN vehicles v ON v.id = r.id_vehicle
        INNER JOIN establishments e ON e.id = r.id_establishment
        WHERE r.id = ?
    `
    const [items] = await connection.execute(query, [id])
    return items
}

const getReservByParkingId = async (id) => {
    const query = `
        SELECT 
            r.id, 
            r.data_reserva, 
            r.hora_reserva,
            r.data_entrada,
            r.hora_entrada,
            r.data_saida, 
            r.hora_saida,
            r.value,
            r.parko_app,
            u.id as id_costumer,
            u.name,
            u.email, 
            u.tel,
            s.status,
            v.id as id_vehicle,
            v.name as name_vehicle,
            v.color,
            v.license_plate,
            r.id_establishment,
            e.name as establishment,
            e.image as image_url_establishment,
            r.rated
        FROM reservations r
        INNER JOIN users u ON u.id = r.id_costumer 
        INNER JOIN status_reservation s ON s.id = r.status_reservation
        INNER JOIN vehicles v ON v.id = r.id_vehicle
        INNER JOIN establishments e ON e.id = r.id_establishment
        WHERE e.id = ?
    `
    const [items] = await connection.execute(query, [id])
    return items
}
const postReservation = async (body) => {
    const hora = new Date().toLocaleTimeString()
    const dia = new Date().toLocaleDateString()

    const { 
        data_entrada,
        hora_entrada,
        data_saida,
        hora_saida,
        value,
        id_costumer,
        status_reservation,
        id_vehicle,
        id_establishment,
        parko_app
    } = body

    const query = `
        INSERT INTO reservations (
            data_reserva, 
            hora_reserva,
            data_entrada,
            hora_entrada,
            data_saida, 
            hora_saida,
            value,
            id_costumer,
            status_reservation,
            id_vehicle,
            id_establishment,
            parko_app
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const values = [
        dia, hora,
        dataFormatada(data_entrada), 
        hora_entrada,
        dataFormatada(data_saida), 
        hora_saida,
        value,
        id_costumer,
        status_reservation,
        id_vehicle,
        id_establishment,
        parko_app
    ]

    const [result] = await connection.execute(query, values)

    if (result.affectedRows === 1) {
        const reservationId = result.insertId

        await connection.execute(`
            UPDATE establishments 
            SET vagas_ocupadas = vagas_ocupadas + 1 
            WHERE id = ?
        `, [id_establishment])

        const [rows] = await connection.execute(`
            SELECT * FROM reservations WHERE id = ?
        `, [reservationId])

        return rows[0]
    }

    return null
}

const deleteReservation = async (id) => {
    await connection.execute("DELETE FROM reservations WHERE id = ?", [id])
}

const putReservation = async (body, id) => {

    const { 
        data_entrada, 
        hora_entrada, 
        data_saida = "", 
        hora_saida = "", 
        value, 
        status, 
        id_vehicle, 
        id_establishment 
    } = body

    const query = `
        UPDATE reservations 
        SET 
            data_entrada = ?, 
            hora_entrada = ?, 
            data_saida = ?, 
            hora_saida = ?, 
            value = ?, 
            status_reservation = ?, 
            id_vehicle = ? 
        WHERE id = ?
    `
    const values = [
        dataFormatada(data_entrada), 
        hora_entrada, 
        dataFormatada(data_saida), 
        hora_saida, 
        value, 
        status, 
        id_vehicle, 
        id
    ]

    const [result] = await connection.execute(query, values)

    if(result.affectedRows === 1) {

        if (status === 4) {
            const updateQuery = `
                UPDATE establishments
                SET vagas_ocupadas = vagas_ocupadas - 1
                WHERE id = ?
            `
            await connection.execute(updateQuery, [id_establishment])
        }

        const [rows] = await connection.execute(`
            SELECT * FROM reservations WHERE id = ?
        `, [id])

        return rows[0]
    }
}

const changeValue = async (body, id) => {
    const { value } = body

    const query = `UPDATE reservations SET value = ? WHERE id = ?`
    
    await connection.execute(query, [value, id])
}

module.exports = {
    getReservation, 
    getReservationById,
    getReservByParkingId,
    postReservation, 
    deleteReservation, 
    putReservation,
    changeValue
}