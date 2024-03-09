const connection = require("../model");

const getPriceTable = async () => {
    const query = `
        SELECT * FROM price_table;
    `;
    const [items] = await connection.execute(query);

    return items;
};

const getPriceTableById = async (id) => {
    const query = `
        SELECT * FROM price_table WHERE id_estacionamento = ?;
    `;
    const [items] = await connection.execute(query, [id]);

    return items;
};

const createPriceTable = async (body) => {
    const { id_estacionamento, tempo_tolerancia, valor_hora, valor_fracao_hora } = body;
    const query = `
        INSERT INTO price_table (
            id,
            id_estacionamento,
            tempo_tolerancia,
            valor_hora, 
            valor_fracao_hora
        ) VALUES (
            (SELECT MAX(p.id) FROM price_table p)+1,
            ?, ?, ?, ?
        );
    `;
    const values = [id_estacionamento, tempo_tolerancia, valor_hora, valor_fracao_hora];

    await connection.execute(query, values);
};

const updatePriceTable = async (body, idEstacionamento) => {

    const { tempo_tolerancia, valor_hora, valor_fracao_hora } = body;
    const query = `
        UPDATE price_table 
        SET 
            tempo_tolerancia = ?, 
            valor_hora = ?, 
            valor_fracao_hora = ? 
        WHERE id_estacionamento = ?
    `;
    const values = [tempo_tolerancia, valor_hora, valor_fracao_hora, idEstacionamento];

    await connection.execute(query, values);
};

const deletePriceTable = async (id) => {
    const query = "DELETE FROM price_table WHERE id_estacionamento = ?";
    await connection.execute(query, [id]);
};

module.exports = {
    getPriceTable,
    getPriceTableById,
    createPriceTable,
    updatePriceTable,
    deletePriceTable
};