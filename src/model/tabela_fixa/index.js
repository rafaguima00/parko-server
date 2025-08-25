const connection = require("../model")

const getTabelaFixa = async (id) => {
    const query = "SELECT * FROM tabela_fixa ORDER BY value"
    const [items] = await connection.execute(query, [id])

    return items
}

const getTabelaFixaById = async (id) => {
    const query = "SELECT * FROM tabela_fixa WHERE id_establishment = ? ORDER BY value"
    const [items] = await connection.execute(query, [id])

    return items
}

const createTabelaFixa = async (body) => {
    for (const tabelaFixa of body) {

        const { id_establishment, primeira_hora, segunda_hora, value } = tabelaFixa
    
        const query = `
            INSERT INTO tabela_fixa(
                id_establishment,
                primeira_hora,
                segunda_hora,
                value
            ) VALUES (
                ?, ?, ?, ?
            )
        `
        const values = [id_establishment, primeira_hora, segunda_hora, value]
    
        await connection.execute(query, values)
    }
}

const updateTabelaFixa = async (body, idEstacionamento) => {
    for (const tabelaFixa of body) {

        const { id, primeira_hora, segunda_hora, value } = tabelaFixa
        
        const query = `
            UPDATE tabela_fixa SET primeira_hora = ?, segunda_hora = ?, value = ? WHERE id = ? AND id_establishment = ?
        `
        const values = [primeira_hora, segunda_hora, value, id, idEstacionamento]
    
        await connection.execute(query, values)
    }
}

const deleteTabelaFixa = async (body) => {

    for (const tabelaFixa of body) {

        const { id } = tabelaFixa

        const query = "DELETE FROM tabela_fixa WHERE id = ?"
        await connection.execute(query, [id])
    }
}

module.exports = {
    getTabelaFixa,
    getTabelaFixaById,
    createTabelaFixa,
    updateTabelaFixa,
    deleteTabelaFixa
}