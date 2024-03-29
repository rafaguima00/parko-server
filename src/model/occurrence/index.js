const connection = require("../model");

const getOccurrence = async () => {
    const query = `
        SELECT 
            o.id,
            o.cod,
            o.local,
            o.data,
            o.numero_comanda as num_comanda,
            o.nome_cliente,
            o.veiculo,
            o.placa_veiculo,
            o.cor_veiculo,
            o.num_doc,
            o.renavam,
            o.data_entrada, 
            o.hora_entrada,
            o.value,
            o.desc_item,
            o.bem_furtado,
            o.num_bo,
            o.id_occurrence,
            t.name as type_occurrence,
            o.id_establishment,
            e.name as establishment
        FROM occurrence o
        INNER JOIN type_occurrence t ON t.id = o.id_occurrence
        INNER JOIN establishments e ON e.id = o.id_establishment;
    `;
    const [items] = await connection.execute(query);
    return items;
}

const createOccurrence = async (body) => {
    const {
        local,
        data,
        numero_comanda,
        nome_cliente,
        veiculo,
        placa_veiculo,
        cor_veiculo,
        num_doc,
        renavam,
        data_entrada, 
        hora_entrada,
        value,
        desc_item,
        bem_furtado,
        num_bo,
        id_occurrence,
        id_establishment
    } = body;

    if(id_occurrence == 1) {
        const query = `
            INSERT INTO occurrence (
                local,
                data,
                numero_comanda,
                nome_cliente,
                veiculo,
                placa_veiculo,
                cor_veiculo,
                num_doc,
                renavam,
                data_entrada, 
                hora_entrada,
                value,
                desc_item,
                id_occurrence,
                id_establishment
            ) VALUES (
                ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
            );
        `;
        const values = [
            local,
            data,
            numero_comanda,
            nome_cliente,
            veiculo,
            placa_veiculo,
            cor_veiculo,
            num_doc,
            renavam,
            data_entrada, 
            hora_entrada,
            value,
            desc_item,
            id_occurrence,
            id_establishment
        ];

        await connection.execute(query, values);
        
    } else if(id_occurrence == 2) {
        const query = `
            INSERT INTO occurrence (
                nome_cliente,
                veiculo,
                bem_furtado,
                data,
                local,
                num_bo,
                numero_comanda,
                id_occurrence,
                id_establishment	
            ) VALUES (
                ?,?,?,?,?,?,?,?,?
            );
        `;
        const values = [
            nome_cliente,
            veiculo,
            bem_furtado,
            data,
            local,
            num_bo,
            numero_comanda,
            id_occurrence,
            id_establishment
        ];

        await connection.execute(query, values);
    } else if(id_occurrence == 3) {
        const query = `
            INSERT INTO occurrence (
                bem_furtado,
                data,
                local,
                numero_comanda,
                id_occurrence,
                id_establishment	
            ) VALUES (
                ?,?,?,?,?,?
            );
        `;
        const values = [
            bem_furtado,
            data,
            local,
            numero_comanda,
            id_occurrence,
            id_establishment
        ];

        await connection.execute(query, values);
    }
}

const updateOccurrence = async (body, id) => {
    const {
        local,
        data,
        num_doc,
        value,
        desc_item,
        bem_furtado,
        num_bo,
        id_occurrence
    } = body;

    const query = `
        UPDATE occurrence 
        SET 
            local = ?,
            data = ?,
            num_doc = ?,
            value = ?,
            desc_item = ?,
            bem_furtado = ?,
            num_bo = ?,
            id_occurrence = ?
        WHERE id = ?;
    `;
    const values = [
        local,
        data,
        num_doc,
        value,
        desc_item,
        bem_furtado,
        num_bo,
        id_occurrence,
        id
    ];

    await connection.execute(query, values);
}

const deleteOccurrence = async (id) => {
    const query = "DELETE FROM occurrence WHERE id = ?";

    await connection.execute(query, [id]);
}

module.exports = {
    getOccurrence,
    createOccurrence,
    deleteOccurrence,
    updateOccurrence
}