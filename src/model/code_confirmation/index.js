const connection = require("../model")

const verifyExistentCode = async (id) => {
    const query = `
        SELECT code, expires_at FROM code_confirmation WHERE id_reservation = ?
    `
    const [items] = await connection.execute(query, [id])
    return items
}

const generateCode = async (body) => {
    const { id_reservation } = body
    
    const code = Math.floor(1000 + Math.random() * 9000).toString().padStart(4, "0") // Gera um código de 4 dígitos
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // Expira em 10 minutos
    
    const insertQuery = `
        INSERT INTO code_confirmation (id_reservation, code, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE code = ?, expires_at = ?
    `
    const values = [id_reservation, code, expiresAt, code, expiresAt]

    const execute = await connection.execute(insertQuery, values)

    if(execute) {
        const query = `
            SELECT code, expires_at FROM code_confirmation WHERE id_reservation = ?
        `

        const [items] = await connection.execute(query, [id_reservation])
        return items
    }
}

const verifyCode = async (body) => {
    const { id_reservation, code } = body

    const query = `
        SELECT code, expires_at FROM code_confirmation WHERE id_reservation = ? AND code = ?
    `

    const [items] = await connection.execute(query, [id_reservation, code])

    if(items.length > 0) {
        const query = `
            DELETE FROM code_confirmation WHERE id_reservation = ?
        `
        await connection.execute(query, [id_reservation])
    }

    return items
}

module.exports = {
    generateCode,
    verifyCode,
    verifyExistentCode
}