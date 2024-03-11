const connection = require("../model");
const middleware = {
    avaliacao: require("../../middleware/ratings")
};

const getRatings = async () => {
    const query = `
        SELECT r.*, u.name as name_costumer FROM ratings r
        INNER JOIN users u ON u.id = r.id_costumer;
    `
    const [items] = await connection.execute(query);

    return items;
};

const createRating = async (body) => {
    const { id_costumer, id_establishment, rate, comments } = body;

    const query = `
        INSERT INTO ratings (
            id_costumer,
            id_establishment,
            rate,
            comments
        ) VALUES (?, ?, ?, ?)
    `;
    const values = [id_costumer, id_establishment, rate, comments];
    const createRate = await connection.execute(query, values);

    return middleware.avaliacao.verificarAvaliacao(createRate, id_establishment);
};

const deleteRating = async (id) => {
    const query = `
        SELECT id_establishment FROM ratings WHERE id = ?
    `;
    const [select] = await connection.execute(query, [id]);
    const idEstacionamento = select[0].id_establishment;

    //Deletar dado
    if(select !== undefined) {
        const query = "DELETE FROM ratings WHERE id = ?;"
        const deleted = await connection.execute(query, [id]);

        return middleware.avaliacao.verificarAvaliacao(deleted, idEstacionamento);
    }
};

const updateRating = async (body, id) => {
    const { rate, comments, id_establishment } = body;

    const query = `
        UPDATE ratings
        SET 
            rate = ?,
            comments = ? 
        WHERE id = ? 
    `;
    const values = [rate, comments, id];
    const updated = await connection.execute(query, values);

    return middleware.avaliacao.verificarAvaliacao(updated, id_establishment);
};

module.exports = {
    getRatings,
    createRating,
    deleteRating,
    updateRating
};