const connection = require("../model")

const getFavorites = async (id) => {
    const query = `
        SELECT 
            f.*,
            e.*
        FROM favorites f
        INNER JOIN establishments e ON e.id = f.parking_id
        WHERE user_id = ?
    `
    
    const [items] = await connection.execute(query, [id])
    return items
}

const createFavorites = async (body) => {
    const { id_user, id_establishment } = body

    const query = `
        INSERT INTO favorites (user_id, parking_id) VALUES (?, ?)
    `

    await connection.execute(query, [id_user, id_establishment])
}

const deleteFavorites = async (body) => {
    const { id_user, id_establishment } = body

    const query = "DELETE FROM favorites WHERE user_id = ? AND parking_id = ?"

    await connection.execute(query, [id_user, id_establishment])
}

module.exports = {
    getFavorites,
    createFavorites,
    deleteFavorites
}