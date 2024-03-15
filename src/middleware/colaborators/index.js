const model = require("../../model/colaborators");

const validateBody = async (req, res, next) => {
    const { colaborator, email, cpf, rg, tel, data_nasc, inicio_contrato } = req.body;
    
    if(
        colaborator === "" ||
        email === "" ||
        cpf === "" ||
        rg === "" ||
        tel === "" ||
        data_nasc === "" ||
        inicio_contrato === ""
    ) {
        return res.status(400).json({ message: "O campo de texto não pode estar vazio" });
    }

    if(
        colaborator === undefined ||
        email === undefined ||
        cpf === undefined ||
        rg === undefined ||
        tel === undefined ||
        data_nasc === undefined ||
        inicio_contrato === undefined
    ) {
        return res.status(400).json({ message: "Campo de texto obrigatório" });
    }

    //verificar se já existe o email e cpf cadastrado
    const getAll = await model.getColab();
    const emailExists = getAll.find(item => item.email == email);
    const cpfExists = getAll.find(item => item.cpf == cpf);

    if(emailExists) return res.status(400).json({ 
        message: "Este e-mail já está em uso" 
    });

    if(cpfExists) return res.status(400).json({ 
        message: "Este CPF já está em uso" 
    });

    next();
}

const validateRequestPut = async (req, res, next) => {
    const { colaborator, email, tel, e_admin, tipo_contratacao } = req.body;

    if(
        colaborator === "" ||
        email === "" || 
        tel === "" ||
        e_admin === "" || 
        tipo_contratacao === "" 
    ) {
        return res.status(400).json({ message: "O campo de texto não pode estar vazio" });
    }

    if(
        colaborator === undefined ||
        email === undefined || 
        tel === undefined ||
        e_admin === undefined || 
        tipo_contratacao === undefined 
    ) {
        return res.status(400).json({ message: "Campo de texto obrigatório" });
    }

    next();
}

module.exports = {
    validateBody,
    validateRequestPut
}