const connection = require("../model");

const getDebts = async () => {
    const query = `
        SELECT 
            d.id,
            d.value,
            u.name as costumer,
            e.name as establishment,
            s.status
        FROM debts d
        INNER JOIN users u ON u.id = d.id_costumer
        INNER JOIN establishments e ON e.id = d.id_establishment
        INNER JOIN status_debts s ON s.id = d.status;
    `;

    const [items] = await connection.execute(query);
    return items;
}

const getDebtsByOwnerId = async (id) => {
    const query = `
        SELECT 
            d.id,
            d.value,
            u.name as costumer,
            e.name as establishment,
            s.status
        FROM debts d
        INNER JOIN users u ON u.id = d.id_costumer
        INNER JOIN establishments e ON e.id = d.id_establishment
        INNER JOIN status_debts s ON s.id = d.status
        WHERE u.id = ?;
    `;
    const [items] = await connection.execute(query, [id]);
    return items;
}

const createDebt = async (debt) => {
    const { value, id_costumer, id_establishment } = debt;

    const query = `
        INSERT INTO debts(
            id, 
            value, 
            id_costumer, 
            id_establishment, 
            status
        ) VALUES (
            (SELECT MAX(d.id) FROM debts d)+1, 
            ?, ?, ?, 1
        )
    `;
    const values = [value, id_costumer, id_establishment];

    await connection.execute(query, values);
}

const deleteDebt = async (id) => {
    const query = "DELETE FROM debts WHERE id = ?";
    await connection.execute(query, [id]);
}

const updateDebt = async (debt, id) => {
    const { value, status } = debt;

    const query = `
        UPDATE debts SET value = ?, status = ? WHERE id = ?;
    `;
    const values = [value, status, id];

    await connection.execute(query, values);
}

module.exports = {
    getDebts,
    getDebtsByOwnerId,
    createDebt,
    deleteDebt,
    updateDebt
}