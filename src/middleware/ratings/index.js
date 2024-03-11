const connection = require("../../model/model");

const verificarAvaliacao = async (conditional, data) => {
    if(conditional) {
        const query = `
            SELECT rate FROM ratings WHERE id_establishment = ?;
        `;
        const [select] = await connection.execute(query, [data]);
        
        const selectRate = () => {
            const arr = [];

            for (let i = 0; i < select.length; i++) {
                arr.push(select[i].rate);
            }

            return { arr };
        };
        
        const { arr } = selectRate();

        if(select) {

            const somarNotas = arr.reduce((prev, current) => {
                return prev + current;
            }, 0);

            const calcularMedia = somarNotas / arr.length;
            const numberRound = calcularMedia.toFixed(1);
            
            const query = `
                UPDATE establishments 
                SET 
                    rate = ?
                WHERE id = ?
            `;
            const values = [numberRound, data];

            await connection.execute(query, values);
        }
    }
};

module.exports = {
    verificarAvaliacao
};