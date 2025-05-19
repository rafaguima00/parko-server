const connection = require("../model")

const getDebts = async () => {
    const query = `
        SELECT 
            d.id,
            d.value,
            u.id as id_costumer,
            u.name as costumer,
            id_establishment,
            e.name as establishment,
            s.status
        FROM debts d
        INNER JOIN users u ON u.id = d.id_costumer
        INNER JOIN establishments e ON e.id = d.id_establishment
        INNER JOIN status_debts s ON s.id = d.status
    `

    const [items] = await connection.execute(query)
    return items
}

const getDebtsByOwnerId = async (id) => {
    const query = `
        SELECT 
            d.*,
            u.id as id_costumer,
            u.name as costumer,
            e.name as establishment,
            s.status
        FROM debts d
        INNER JOIN users u ON u.id = d.id_costumer
        INNER JOIN establishments e ON e.id = d.id_establishment
        INNER JOIN status_debts s ON s.id = d.status
        WHERE id_establishment = ?
    `
    const [items] = await connection.execute(query, [id])
    return items
}

const createDebt = async (debt) => {
    const { value, id_costumer, id_establishment } = debt

    const localData = new Date().toLocaleString()

    const select = `
        SELECT * FROM debts WHERE id_costumer = ? AND status = 1
    `
    const [items] = await connection.execute(select, [id_costumer])

    if(items.length >= 1) {
        const query = `
            UPDATE debts SET value = value + ?, date_updated = ? WHERE id_costumer = ? AND status = 1
        `
        const values = [value, localData, id_costumer]

        return await connection.execute(query, values)
    }

    const query = `
        INSERT INTO debts(
            value, 
            id_costumer, 
            id_establishment, 
            status,
            date_created
        ) VALUES (
            ?, ?, ?, 1, ?
        )
    `
    const values = [value, id_costumer, id_establishment, localData]

    await connection.execute(query, values)
}

const deleteDebt = async (id) => {
    const query = "DELETE FROM debts WHERE id = ?"
    await connection.execute(query, [id])
}

const updateDebt = async (debt, idCustomer) => {
    const { value, id_establishment, payment_method } = debt

    const localData = new Date().toLocaleString()

    const selectItem = `SELECT * FROM debts WHERE id_costumer = ? AND status = 1`
    const [items] = await connection.execute(selectItem, [idCustomer])

    if(value < items[0].value) {
        const query = `
            UPDATE debts SET value = ?, date_updated = ? WHERE id_costumer = ? AND status = 1
        `
        const values = [items[0].value - value, localData, idCustomer]

        const [result] = await connection.execute(query, values)

        if(result.affectedRows === 1) {
            const query = `
                INSERT INTO debts (
                    id_costumer, id_establishment, value, status, payment_method, date_created
                ) VALUES (?, ?, ?, 2, ?, ?)
            `
            const values = [idCustomer, id_establishment, value, payment_method, localData]
            const [result] =  await connection.execute(query, values)

            if(result.affectedRows >= 1) {
                const [items] = await connection.execute(`SELECT * FROM debts WHERE id_establishment = ?`, [id_establishment])
                return items
            }
        }
    }

    if(value === items[0].value) {
        const update = `
            UPDATE debts SET payment_method = ?, date_updated = ?, status = 2 WHERE id_costumer = ? AND status = 1
        `
        const values = [payment_method, localData, idCustomer]
        const [result] = await connection.execute(update, values)

        if(result.affectedRows === 1) {
            const query = `
                UPDATE payments SET status = "approved" WHERE id_customer = ?
            `
            const [result] = await connection.execute(query, [idCustomer])

            if(result.affectedRows >= 1) {
                const [items] = await connection.execute(`SELECT * FROM debts WHERE id_establishment = ?`, [id_establishment])
                return items
            }
        }
    }
}

module.exports = {
    getDebts,
    getDebtsByOwnerId,
    createDebt,
    deleteDebt,
    updateDebt
}