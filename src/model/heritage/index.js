const connection = require("../model");

const getHeritage = async () => {
    const query = "SELECT * FROM heritage;"
    const [items] = await connection.execute(query);
    return items;
}

const createHeritage = async (body) => {
    const { 
        code, 
        name, 
        category, 
        date_registry, 
        quantity, 
        unit_measurement, 
        value, 
        id_establishment 
    } = body;

    const query = `
        INSERT INTO heritage(
            code,
            name,
            category,
            date_registry,
            quantity,
            unit_measurement,
            value, 
            id_establishment
        ) VALUES (
            ?,?,?,?,?,?,?,?
        );
    `;

    const values = [
        code, 
        name, 
        category, 
        date_registry, 
        quantity, 
        unit_measurement, 
        value, 
        id_establishment 
    ];

    await connection.execute(query, values);
}

const updateHeritage = async (body, id) => {
    const { name, category, date_registry, quantity, unit_measurement, value } = body;

    const query = `
        UPDATE heritage
        SET 
            name = ?, 
            category = ?,
            date_registry = ?,
            quantity = ?,
            unit_measurement = ?,
            value = ?
        WHERE id = ?
    `;

    const values = [name, category, date_registry, quantity, unit_measurement, value, id];

    await connection.execute(query, values);
}

const deleteHeritage = async (id) => {
    const query = "DELETE FROM heritage WHERE id = ?"

    await connection.execute(query, [id]);
}

module.exports = {
    getHeritage,
    createHeritage,
    updateHeritage,
    deleteHeritage
}