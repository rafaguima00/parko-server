const model = require("../../model/colaborators");

const validateBody = async (req, res, next) => {
    const { name, email, cpf, rg, tel, data_nasc, inicio_contrato } = req.body;
    
    if(
        name === "" ||
        email === "" ||
        cpf === "" ||
        rg === "" ||
        tel === "" ||
        data_nasc === "" ||
        inicio_contrato === ""
    ) {
        return res.status(400).json({ message: "The field cannot be empty" });
    }

    if(
        name === undefined ||
        email === undefined ||
        cpf === undefined ||
        rg === undefined ||
        tel === undefined ||
        data_nasc === undefined ||
        inicio_contrato === undefined
    ) {
        return res.status(400).json({ message: "The field is required" });
    }

    //verificar se já existe o email e cpf cadastrado
    const getAll = await model.getColab();
    const emailExists = getAll.find(item => item.email == email);
    const cpfExists = getAll.find(item => item.cpf == cpf);

    if(emailExists) return res.status(400).json({ message: "This email is already in use" });

    if(cpfExists) return res.status(400).json({ message: "This CPF is already in use" });

    next();
}

const validateRequestPut = async (req, res, next) => {
    const { name, email, tel, e_admin, tipo_contratacao, unidade } = req.body;

    if(
        name === "" ||
        email === "" || 
        tel === "" ||
        e_admin === "" || 
        tipo_contratacao === "" || 
        unidade === ""  
    ) {
        return res.status(400).json({ message: "The field cannot be empty" })
    }

    if(
        name === undefined ||
        email === undefined || 
        tel === undefined ||
        e_admin === undefined || 
        tipo_contratacao === undefined || 
        unidade === undefined 
    ) {
        return res.status(400).json({ message: "The field is required" })
    }

    //verificar se existe um usuário com e-mail 
    const validateBody = await model.getColab();
    const emailExists = validateBody.find(item => item.email == email);

    if(emailExists) return res.status(400).json({ message: "This email is already in use" });

    next();
}

module.exports = {
    validateBody,
    validateRequestPut
}