const connection = require("../model");

const getUsers = async () => {
    const [items] = await connection.execute("SELECT * FROM users;");
    return items;
}

const postUsers = async (body, hashedPassword) => {
    const { name_user, email, cpf, rg, tel, data_nasc } = body;
    const createdAt = new Date().toLocaleString();

    const query = `
        INSERT INTO users (
            id,
            name, 
            password,
            email, 
            cpf, 
            rg,
            tel, 
            data_nasc, 
            created_at
        ) VALUES(
            (SELECT MAX(u.id) FROM users u)+1,
            ?, ?, ?, ?, ?, ?, ?, ?
        );
    `;
    const values = [name_user, hashedPassword, email, cpf, rg, tel, data_nasc, createdAt];
    await connection.execute(query, values);
}

const deleteUsers = async (id) => {
    // 1- deletar a reserva do usuário
    const query = "DELETE FROM reservations WHERE id_costumer = ?;"
    const deleteReservation = await connection.execute(query, [id]);

    // 2- deletar os débitos do usuário
    if(deleteReservation) {
        const query = "DELETE FROM debts WHERE id_costumer = ?;"
        const deleteDebt = await connection.execute(query, [id]);

        // 3- deletar veículos do usuário
        if(deleteDebt) {
            const query = "DELETE FROM vehicles WHERE id_costumer = ?"
            const deleteVehicle = await connection.execute(query, [id]);
    
            // 4- Por último, deletar o usuário
            if(deleteVehicle) {
                const query = "DELETE FROM users WHERE id = ?"
                await connection.execute(query, [id]);
            }
        }
    }
}

const updateUsers = async (body, id) => {
    const { name, tel, cpf } = body;
    const updatedAt = new Date().toLocaleString();

    const query = `
        UPDATE users 
        SET 
            name = ?, 
            tel = ?, 
            cpf = ?,
            updated_at = ? 
        WHERE id = ?
    `;

    const values = [name, tel, cpf, updatedAt, id];

    await connection.execute(query, values);
}

module.exports = {
    getUsers,
    postUsers,
    deleteUsers,
    updateUsers
}