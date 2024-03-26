const connection = require("../model");

const getAportes = async () => {
    const query = `
        SELECT 
           id,
           id_establishment,
           id_colaborator,
           value,
           created_at,
           description
        FROM aportes;
    `;
    const [items] = await connection.execute(query);
    return items;
};

const postAportes = async (body) => {
    const { id_establishment, id_colaborator, value, created_at, description } = body;

    const query = `
        INSERT INTO aportes(
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

const deleteAportes = async (id) => {
    const query = "DELETE FROM aportes WHERE id = ?;";

    await connection.execute(query, [id]);
};

module.exports = {
    getAportes,
    postAportes,
    deleteAportes
};