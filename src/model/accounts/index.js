const connection = require("../model")

const getAccounts = async () => {
    const query = `SELECT * FROM accounts`

    const [items] = await connection.execute(query)
    return items
}

const createAccount = async (accounts) => {
    const { 
        category, 
        desc_item, 
        value, 
        date_created, 
        date_payment, 
        status, 
        cost, 
        id_establishment 
    } = accounts

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

    const values = [ 
        category, 
        desc_item, 
        value, 
        date_created, 
        date_payment, 
        status, 
        cost, 
        id_establishment 
    ]

    await connection.execute(query, values)
}

const updateAccount = async (body, id) => {
    const { 
        category, 
        desc_item, 
        value, 
        date_created, 
        date_payment, 
        status, 
        cost 
    } = body

    const time = new Date().toTimeString()
    const createdAt = `${date_created}, ${time}`

    const query = `
        UPDATE 
            accounts 
        SET 
            category = ?, 
            desc_item = ?, 
            value = ?, 
            date_created = ?, 
            date_payment = ?,
            status = ?,
            cost = ?
        WHERE id = ?
    `

    const values = [ 
        category, 
        desc_item, 
        value, 
        createdAt, 
        date_payment, 
        status, 
        cost,
        id
    ]

    await connection.execute(query, values)
}

const deleteAccount = async (id) => {
    const query = "DELETE FROM accounts WHERE id = ?"

    await connection.execute(query, [id])
}

module.exports = {
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount
}