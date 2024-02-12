const connection = require("../model");

const getEstablishment = async () => {
    const query = "SELECT * FROM establishments";
    const [items] = await connection.execute(query);
    return items;
}

//Recuperar dados de colaboradores que trabalham em determinado estabelecimento
const getEstByColaborator = async (id) => {
    const query = `
        SELECT 
            c.id,
            c.name as colaborator, 
            c.email, 
            c.data_nasc, 
            c.created_at,
            c.updated_at,  
            c.inicio_contrato, 
            t.type_colaborator,
            h.type as tipo_contratacao,
            e.razao_social, 
            e.name
        FROM colaborators c
        INNER JOIN establishments e ON e.id = c.unidade
        INNER JOIN type_colaborators t ON t.id = c.e_admin
        INNER JOIN type_hiring h ON h.id = c.tipo_contratacao
        WHERE e.id = ?;
    `;
    const [items] = await connection.execute(query, [id]);
    return items;
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
        tempo_tolerancia,
        valor_hora, 
        valor_fracao_hora
    } = body;

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
            tempo_tolerancia,
            valor_hora, 
            valor_fracao_hora
        ) VALUES (
            (SELECT MAX(e.id) from establishments e)+1,
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
        )
    `;
    
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
        tempo_tolerancia,
        valor_hora, 
        valor_fracao_hora
    ];

    await connection.execute(query, values);
}

const deleteEstablishment = async (id) => {
    const query = "DELETE FROM establishments WHERE id = ?";
    await connection.execute(query, [id]);
}

const putEstablishment = async (id, body) => {
    const updatedAt = new Date().toLocaleString();

    const { 
        razao_social, 
        name, 
        contato, 
        end, 
        cep, 
        estado, 
        cidade, 
        bairro, 
        tempo_tolerancia, 
        valor_hora, 
        valor_fracao_hora 
    } = body;

    const query = `
        UPDATE establishments 
        SET 
            razao_social = ?, 
            name = ?, 
            contato = ?,
            end = ?,
            cep = ?,
            estado = ?,
            cidade = ?,
            bairro = ?,
            tempo_tolerancia = ?,
            valor_hora = ?,
            valor_fracao_hora = ?,
            updated_at = ?
        WHERE id = ?
    `;

    const values = [
        razao_social, 
        name, 
        contato, 
        end, 
        cep, 
        estado, 
        cidade, 
        bairro, 
        tempo_tolerancia, 
        valor_hora, 
        valor_fracao_hora,
        updatedAt,
        id
    ];

    await connection.execute(query, values);
}

module.exports = {
    getEstablishment,
    getEstByColaborator,
    postEstablishment, 
    deleteEstablishment, 
    putEstablishment
}