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
    const { id_establishment, id_colaborator } = body
    
    const dataAbertura = new Date().toLocaleDateString("pt-br")
    const horaAbertura = new Date().toLocaleTimeString("pt-br")

    const select = "SELECT * FROM abertura_caixa WHERE id_establishment = ?"

    const [items] = await connection.execute(select, [id_establishment])

    if(items.length === 0) {
        const query = `
            INSERT INTO abertura_caixa (
                id_establishment,
                id_colaborator,
                data_abertura,
                hora_abertura,
                data_fechamento,
                hora_fechamento,
                valor_abertura,
                valor_fechamento
            ) VALUES (?, ?, ?, ?, "", "", 0, 0)
        `
        const values = [
            id_establishment,
            id_colaborator,
            dataAbertura,
            horaAbertura
        ]

        // Abre caixa quando é a primeira vez que o estacionamento abre o caixa
        await connection.execute(query, values)
        return { message: "Caixa iniciado pela primeira vez." }
    }

    const ultimaAbertura = items[items.length - 1]
    const valorAnteriorDoCaixa = ultimaAbertura.valor_fechamento

    if(ultimaAbertura.data_fechamento === dataAbertura) {
        // Se o caixa estiver fechado e o cliente for reabrir no mesmo dia, fazer a atualização
        const update = `
            UPDATE abertura_caixa SET data_fechamento = "", hora_fechamento = "", aberto = 1 WHERE id = ?
        `
        const [result] = await connection.execute(update, [ultimaAbertura.id])

        if(result.affectedRows === 1) {
            const [items] = await connection.execute("SELECT * FROM abertura_caixa WHERE id = ?", [ultimaAbertura.id])
            return items
        }
    }

    // Abertura de caixa
    const query = `
        INSERT INTO abertura_caixa (
            id_establishment,
            id_colaborator,
            data_abertura,
            hora_abertura,
            data_fechamento,
            hora_fechamento,
            valor_abertura,
            valor_fechamento
        ) VALUES (?, ?, ?, ?, "", "", ?, 0)
    `
    const values = [
        id_establishment,
        id_colaborator,
        dataAbertura,
        horaAbertura,
        valorAnteriorDoCaixa
    ]

    await connection.execute(query, values)
}

const updateCaixa = async (id, body) => {
    const { valor_fechamento, aberto } = body

    const dataFechamento = new Date().toLocaleDateString("pt-br")
    const horaFechamento = new Date().toLocaleTimeString("pt-br")

    const query = `
        UPDATE 
            abertura_caixa
        SET 
            valor_fechamento = ?,
            data_fechamento = ?,
            hora_fechamento = ?,
            aberto = ?
        WHERE id = ?
    `
    const values = [valor_fechamento, dataFechamento, horaFechamento, aberto, id]

    const [result] = await connection.execute(query, values)

    if(result.affectedRows === 1) {
        const [items] = await connection.execute(`SELECT * FROM abertura_caixa WHERE id = ?`, [id])
        return items
    }
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