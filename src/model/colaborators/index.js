const connection = require("../model");

const getColab = async () => {
    const query = `
        SELECT 
            c.id, 
            c.name, 
            c.password,
            c.email, 
            c.cpf, 
            c.rg, 
            c.tel, 
            c.data_nasc, 
            c.created_at, 
            c.updated_at,
            c.inicio_contrato,
            t.type_colaborator,
            h.type as tipo_contrato,
            e.name as establishment
        FROM colaborators c
        INNER JOIN type_colaborators t ON t.id = c.e_admin
        INNER JOIN type_hiring h ON h.id = c.tipo_contratacao
        INNER JOIN establishments e ON e.id = c.unidade;
    `;
    const [items] = await connection.execute(query);
    return items;
}

const postColab = async (colaborator, hashedPassword) => {

    const { name, email, cpf, rg, tel, data_nasc, inicio_contrato, e_admin, tipo_contratacao, unidade } = colaborator;
    const createdAt = new Date().toLocaleString();

    const query = `
        INSERT INTO colaborators(
            id, 
            name, 
            email, 
            password,
            cpf, 
            rg, 
            tel, 
            data_nasc, 
            created_at, 
            inicio_contrato,
            e_admin, 
            tipo_contratacao,
            unidade
        ) VALUES (
            (SELECT MAX(c.id) FROM colaborators c)+1, 
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        );
    `;
    const values = [
        name, email, hashedPassword, cpf, rg, tel, data_nasc, createdAt, inicio_contrato, e_admin, tipo_contratacao, unidade
    ];

    await connection.execute(query, values);
}

const deleteColab = async (id) => {
    const query = "DELETE FROM colaborators WHERE id = ?";
    await connection.execute(query, [id])
}

const putColab = async (id, colaborator) => {
    const { name, email, tel, e_admin, tipo_contratacao, unidade } = colaborator;
    const updatedAt = new Date().toLocaleString();

    const query = `
        UPDATE colaborators 
        SET 
            name = ?, 
            email = ?, 
            tel = ?, 
            e_admin = ?, 
            tipo_contratacao = ?, 
            unidade = ?, 
            updated_at = ? 
        WHERE id = ?
    `;
    const values = [name, email, tel, e_admin, tipo_contratacao, unidade, updatedAt, id];

    await connection.execute(query, values);
}

module.exports = {
    getColab,
    postColab,
    deleteColab,
    putColab
}