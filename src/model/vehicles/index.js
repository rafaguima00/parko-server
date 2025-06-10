const connection = require("../model")

const getVehicles = async () => {
    const query = `
        SELECT 
            v.id, 
            v.name, 
            v.color, 
            v.license_plate,
            u.name AS owner
        FROM vehicles v 
        INNER JOIN users u ON u.id = v.id_costumer
    `

    const [items] = await connection.execute(query)
    return items
}

const getVehiclesByOwnerId = async (id) => {
    const query = `
        SELECT 
            v.id, 
            v.name, 
            v.color, 
            v.license_plate,
            u.name AS owner
        FROM vehicles v 
        INNER JOIN users u ON u.id = v.id_costumer
        WHERE u.id = ?
    `

    const [items] = await connection.execute(query, [id])
    return items
}

const createVehicle = async (vehicle) => {
    const { name_vehicle, color, license_plate, id_costumer } = vehicle

    const query = `
        INSERT INTO vehicles (
            id_costumer,
            name,
            color,
            license_plate
        ) VALUES (
            ?, ?, ?, ?
        )
    `
    const values = [id_costumer, name_vehicle, color, license_plate]
    
    await connection.execute(query, values)
}

const deleteVehicle = async (id) => {
    const selectPayment = `
        SELECT * FROM payments WHERE id_vehicle = ?
    `
    const selectReservation = `
        SELECT * FROM reservations WHERE id_vehicle = ?
    `
    const [payments] = await connection.execute(selectPayment, [id])
    const [reservations] = await connection.execute(selectReservation, [id])

    if (payments.length > 0) {
        await connection.execute("DELETE FROM payments WHERE id_vehicle = ?", [id])
    }

    if (reservations.length > 0) {
        await connection.execute("DELETE FROM reservations WHERE id_vehicle = ?", [id])
    }

    const query = "DELETE FROM vehicles WHERE id = ?"

    await connection.execute(query, [id])
}

module.exports = {
    getVehicles,
    getVehiclesByOwnerId,
    createVehicle,
    deleteVehicle
}