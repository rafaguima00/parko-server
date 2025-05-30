const connection = require("../model")

const getColab = async () => {
    const query = `
        SELECT 
            c.id, 
            c.name as colaborator, 
            c.password,
            c.email, 
            c.cpf, 
            c.rg, 
            c.tel, 
            c.data_nasc, 
            c.created_at, 
            c.updated_at,
            c.inicio_contrato,
            c.e_admin,
            c.tipo_contratacao,
            t.type_colaborator,
            h.type as tipo_contrato,
            e.name as establishment,
            e.id as id_establishment
        FROM colaborators c
        INNER JOIN type_colaborators t ON t.id = c.e_admin
        INNER JOIN type_hiring h ON h.id = c.tipo_contratacao
        INNER JOIN establishments e ON e.id = c.unidade
    `
    const [items] = await connection.execute(query)
    return items
}

//Recuperar dados de colaboradores por id do estabelecimento em que trabalha
const getColaboratorById = async (id) => {
    const query = `
        SELECT 
            c.id,
            c.name as colaborator, 
            c.email, 
            c.cpf, 
            c.rg, 
            c.tel, 
            c.data_nasc, 
            c.created_at,
            c.updated_at,  
            c.inicio_contrato,
            c.e_admin,
            c.tipo_contratacao,
            t.type_colaborator,
            h.type as tipo_contrato,
            e.razao_social, 
            e.name as establishment
        FROM colaborators c
        INNER JOIN establishments e ON e.id = c.unidade
        INNER JOIN type_colaborators t ON t.id = c.e_admin
        INNER JOIN type_hiring h ON h.id = c.tipo_contratacao
        WHERE e.id = ?
    `
    const [items] = await connection.execute(query, [id])
    return items
}

const postColab = async (body, hashedPassword) => {

    const { colaborator, email, cpf, rg, tel, data_nasc, inicio_contrato, e_admin, tipo_contratacao, unidade } = body
    const createdAt = new Date().toLocaleString()

    const query = `
        INSERT INTO colaborators(
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
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
    `
    const values = [
        colaborator, email.toLowerCase(), hashedPassword, cpf, rg, tel, data_nasc, createdAt, inicio_contrato, e_admin, tipo_contratacao, unidade
    ]

    await connection.execute(query, values)
}

const deleteColab = async (id) => {
    const query = "DELETE FROM colaborators WHERE id = ?"
    await connection.execute(query, [id])
}

const putColab = async (id, body, hashedPassword) => {
    const { colaborator, email, tel, cpf, rg, e_admin, tipo_contratacao } = body

    const updatedAt = new Date().toLocaleString()
    const query = `
        UPDATE colaborators 
        SET 
            name = ?, 
            email = ?, 
            password = ?,
            tel = ?, 
            cpf = ?,
            rg = ?,
            e_admin = ?, 
            tipo_contratacao = ?, 
            updated_at = ? 
        WHERE id = ?
    `
    const values = [colaborator, email, hashedPassword, tel, cpf, rg, e_admin, tipo_contratacao, updatedAt, id]

    await connection.execute(query, values)
}

const forgotPassword = async (email, hashedPassword) => {
    const updatedAt = new Date().toLocaleString()
    const query = `
        UPDATE colaborators
        SET 
            password = ?,
            updated_at = ?
        WHERE email = ?
    `
    const values = [hashedPassword, updatedAt, email]

    await connection.execute(query, values)
}

module.exports = {
    getColab,
    getColaboratorById,
    postColab,
    deleteColab,
    putColab,
    forgotPassword
}