const connection = require("../model");

const getEstablishment = async () => {
    const query = "SELECT * FROM establishments";
    const [items] = await connection.execute(query);
    return items;
};

const getEstablishmentById = async (id) => {
    const query = "SELECT * FROM establishments WHERE id = ?"

    const [items] = await connection.execute(query, [id]);
    return items;
};

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
};

const deleteEstablishment = async (id) => {
    const query = "DELETE FROM establishments WHERE id = ?";
    await connection.execute(query, [id]);
};

const patchEstablishment = async (id, body) => {
    const updatedAt = new Date().toLocaleString();

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
    } = body;

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
            updated_at = ?
        WHERE id = ?
    `;

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
        updatedAt,
        id
    ];

    await connection.execute(query, values);
};

const patchPriceTable = async (id, body) => {
    const { tempo_tolerancia, valor_hora, valor_fracao_hora } = body;

    const updatedAt = new Date().toLocaleString();
    const query = `
        UPDATE establishments 
        SET 
            tempo_tolerancia = ?,
            valor_hora = ?,
            valor_fracao_hora = ?,
            updated_at = ?
        WHERE id = ?
    `;
    const values = [tempo_tolerancia, valor_hora, valor_fracao_hora, updatedAt, id];

    await connection.execute(query, values);
};

module.exports = {
    getEstablishment,
    getEstablishmentById,
    postEstablishment, 
    deleteEstablishment, 
    patchEstablishment,
    patchPriceTable
}