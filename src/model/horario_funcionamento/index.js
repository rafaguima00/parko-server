const connection = require("../model")

const getOpeningHour = async () => {
    const query = `
        SELECT 
            o.id, 
            o.id_estacionamento,
            e.name as nome_estabelecimento,
            o.dia_semana, 
            o.hora_abertura, 
            o.hora_fechamento
        FROM opening_hour o
        INNER JOIN establishments e ON e.id = o.id_estacionamento
    `
    const [items] = await connection.execute(query)
    return items
}

const getOpeningHourByParking = async (id) => {
    const query = `
        SELECT 
            o.*,
            e.name as nome_estabelecimento
        FROM opening_hour o
        INNER JOIN establishments e ON e.id = o.id_estacionamento
        WHERE o.id_estacionamento = ?
    `
    const [items] = await connection.execute(query, [id])

    return items
}

const postOpeningHour = async (body) => {
    
    for (const openingHour of body) {

        const { id_estacionamento, dia_semana, hora_abertura, hora_fechamento } = openingHour
    
        const query = `
            INSERT INTO opening_hour(
                id_estacionamento,
                dia_semana, 
                hora_abertura, 
                hora_fechamento
            ) VALUES (?, ?, ?, ?)
        `
        const values = [id_estacionamento, dia_semana, hora_abertura, hora_fechamento]
    
        await connection.execute(query, values)

    }
}

const updateOpeningHour = async (body, idEstacionamento) => {

    for (const openingHour of body) {
        const { id, hora_abertura, hora_fechamento, closed } = openingHour
    
        const query = `
            UPDATE opening_hour SET hora_abertura = ?, hora_fechamento = ?, closed = ? WHERE id = ? AND id_estacionamento = ?
        `
        const values = [
            hora_abertura, 
            hora_fechamento, 
            closed, 
            id, 
            idEstacionamento
        ]
    
        await connection.execute(query, values)
    }
}

const deleteOpeningHour = async (id) => {
    const query = "DELETE FROM opening_hour WHERE id_estacionamento = ?"

    await connection.execute(query, [id])
}

module.exports = {
    getOpeningHour,
    getOpeningHourByParking,
    postOpeningHour,
    updateOpeningHour,
    deleteOpeningHour
}