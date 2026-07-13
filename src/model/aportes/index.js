const connection = require("../model")

const getAportes = async (id) => {
    const query = `
        SELECT 
           id,
           id_establishment,
           id_colaborator,
           value,
           created_at,
           description
        FROM aportes WHERE id_establishment = ?
    `
    const [items] = await connection.execute(query, [id])
    return items
}

const postAportes = async (body) => {
    const { id_establishment, id_colaborator, value, created_at, description } = body

    const query = `
        INSERT INTO aportes(
            id_establishment,
            id_colaborator,
            value,
            created_at,
            description
        ) VALUES (
            ?, ?, ?, ?, ?
        )
    `
    const values = [id_establishment, id_colaborator, value, created_at, description]

    const [result] = await connection.execute(query, values)

    if (result.affectedRows === 1) {
        const query = `
            INSERT INTO accounts(
                category, 
                desc_item,
                value, 
                date_created,
                date_payment,
                status,
                cost, 
                id_establishment
            ) VALUES (
                ?,?,?,?,?,?,?,?
            )
        `
        const values = ["Aporte", description, value, created_at, created_at, "Pago", "Variável", id_establishment]

        await connection.execute(query, values)
    }
}

const deleteAportes = async (id) => {
    const query = "DELETE FROM aportes WHERE id = ?"

    await connection.execute(query, [id])
}

module.exports = {
    getAportes,
    postAportes,
    deleteAportes
}