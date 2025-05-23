const connection = require("../model")

const getEstablishment = async () => {
    const query = "SELECT e.* FROM establishments e"
    const [items] = await connection.execute(query)
    return items
}

const getEstablishmentById = async (id) => {
    const query = "SELECT * FROM establishments WHERE id = ?"

    const [items] = await connection.execute(query, [id])
    return items
}

const getNearbyEstablishments = async (body) => {
    const { user_lat, user_long, radiusKm = 8 } = body

    const query = `
        SELECT *, (
            6371 * ACOS(
                COS(RADIANS(?)) * COS(RADIANS(latitude)) *
                COS(RADIANS(longitude) - RADIANS(?)) +
                SIN(RADIANS(?)) * SIN(RADIANS(latitude))
            )
        ) AS distance
        FROM establishments
        HAVING distance <= ?
        ORDER BY distance ASC
    `

    const [items] = await connection.execute(query, [user_lat, user_long, user_lat, radiusKm])
    return items
}

const postEstablishment = async (body) => {

    const { 
        razao_social, 
        name, 
        contato, 
        cnpj, 
        inscricao_estadual, 
        inscricao_municipal, 
        end, 
        cep, 
        estado, 
        cidade, 
        bairro,
        longitude, 
        latitude, 
        numero,
        numero_vagas
    } = body

    const query = `
        INSERT INTO establishments(
            id, 
            razao_social, 
            name, 
            contato, 
            cnpj, 
            inscricao_estadual, 
            inscricao_municipal, 
            end,
            cep,
            estado, 
            cidade, 
            bairro, 
            longitude, 
            latitude,
            numero,
            numero_vagas
        ) VALUES (
            (SELECT MAX(e.id) from establishments e)+1,
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
        )
    `
    
    const values = [
        razao_social, 
        name, 
        contato, 
        cnpj, 
        inscricao_estadual, 
        inscricao_municipal, 
        end, 
        cep, 
        estado, 
        cidade, 
        bairro,
        longitude, 
        latitude,
        numero,
        numero_vagas
    ]

    await connection.execute(query, values)
}

const deleteEstablishment = async (id) => {
    const query = "DELETE FROM establishments WHERE id = ?"
    await connection.execute(query, [id])
}

const patchEstablishment = async (id, body) => {
    const updatedAt = new Date().toLocaleString()

    const { 
        razao_social, 
        name, 
        contato, 
        email,
        cnpj,
        inscricao_estadual,
        inscricao_municipal,
        end, 
        cep, 
        estado, 
        cidade, 
        bairro,
        numero,
        numero_vagas
    } = body

    const query = `
        UPDATE establishments 
        SET 
            razao_social = ?, 
            name = ?, 
            contato = ?,
            email = ?,
            cnpj = ?,
            inscricao_estadual = ?,
            inscricao_municipal = ?,
            end = ?,
            cep = ?,
            estado = ?,
            cidade = ?,
            bairro = ?,
            numero = ?,
            numero_vagas = ?,
            updated_at = ?
        WHERE id = ?
    `

    const values = [
        razao_social, 
        name, 
        contato, 
        email,
        cnpj,
        inscricao_estadual,
        inscricao_municipal,
        end, 
        cep, 
        estado, 
        cidade, 
        bairro, 
        numero,
        numero_vagas,
        updatedAt,
        id
    ]

    await connection.execute(query, values)
}

const putVagasOcupadas = async (id, body) => {
    const { vagas_ocupadas } = body

    const query = "UPDATE establishments SET vagas_ocupadas = ? WHERE id = ?"
    const values = [vagas_ocupadas, id]

    await connection.execute(query, values)
}

module.exports = {
    getEstablishment,
    getEstablishmentById,
    getNearbyEstablishments,
    postEstablishment, 
    deleteEstablishment, 
    patchEstablishment,
    putVagasOcupadas
}