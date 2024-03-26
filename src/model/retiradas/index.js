const connection = require("../model");

const getRetiradas = async () => {
    const query = `
        SELECT 
           id,
           id_establishment,
           id_colaborator,
           value,
           created_at,
           description
        FROM retiradas;
    `;
    const [items] = await connection.execute(query);
    return items;
};

const postRetiradas = async (body) => {
    const { id_establishment, id_colaborator, value, created_at, description } = body;

    const query = `
        INSERT INTO retiradas(
            id_establishment,
            id_colaborator,
            value,
            created_at,
            description
        ) VALUES (
            ?, ?, ?, ?, ?
        );
    `;
    const values = [id_establishment, id_colaborator, value, created_at, description];

    await connection.execute(query, values);
};

const deleteRetiradas = async (id) => {
    const query = "DELETE FROM retiradas WHERE id = ?;";

    await connection.execute(query, [id]);
};

module.exports = {
    getRetiradas,
    postRetiradas,
    deleteRetiradas
};