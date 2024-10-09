const connection = require("../model")

const getAberturaCx = async () => {
    const query = "SELECT * FROM abertura_caixa"

    const [items] = await connection.execute(query)
    return items
}

const getAberturaCxById = async (id) => {
    const query = "SELECT * FROM abertura_caixa WHERE id = ?"

    const [items] = await connection.execute(query, [id])
    return items
}

const getAberturaCxByPark = async (id) => {
    const query = "SELECT * FROM abertura_caixa WHERE id_establishment = ?"

    const [items] = await connection.execute(query, [id])
    return items
}

const abrirCaixa = async (body) => {
    const { id_establishment, id_colaborator, value } = body
    
    const dataAbertura = new Date().toLocaleDateString("pt-br")
    const horaAbertura = new Date().toLocaleTimeString("pt-br")

    const query = `
        INSERT INTO abertura_caixa (
            id_establishment,
            id_colaborator,
            data_abertura,
            hora_abertura,
            data_fechamento,
            hora_fechamento,
            value
        ) VALUES (?, ?, ?, ?, "", "", ?);
    `
    const values = [
        id_establishment,
        id_colaborator,
        dataAbertura,
        horaAbertura,
        value
    ]

    await connection.execute(query, values)
}

const updateCaixa = async (id, body) => {
    const { value, aberto } = body

    const dataFechamento = new Date().toLocaleDateString("pt-br")
    const horaFechamento = new Date().toLocaleTimeString("pt-br")

    const query = `
        UPDATE 
            abertura_caixa
        SET 
            value = ?,
            data_fechamento = ?,
            hora_fechamento = ?,
            aberto = ?
        WHERE id = ?;
    `
    const values = [value, dataFechamento, horaFechamento, aberto, id]

    await connection.execute(query, values)
}

const deleteCaixa = async (id) => {
    const query = "DELETE FROM abertura_caixa WHERE id = ?"

    await connection.execute(query, [id])
}

module.exports = {
    getAberturaCx,
    getAberturaCxById,
    getAberturaCxByPark,
    abrirCaixa,
    updateCaixa,
    deleteCaixa
}