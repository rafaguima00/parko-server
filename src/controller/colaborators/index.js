const model = require("../../model/colaborators");
const bcrypt = require("bcrypt");

const login = [];

const getColaborators = async (req, res) => {
    const result = await model.getColab();
    res.status(200).json(result);
}

const postColaborators = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const result = await model.postColab(req.body, hashedPassword);
    return res.status(201).json(result);
}

const loginColaborators = async (req, res) => {
    const email = req.body.email;
    const users = await model.getColab();
    const userLogin = users.find(item => item.email === email);

    if(userLogin === null) {
        return res.status(400).json({ message: "Couldn't find a user" })
    } 
        
    try {
        if (await bcrypt.compare(req.body.password, userLogin.password)) {
            login.push(req.body);
            console.log(login);
            res.status(201).json({ message: "Logado com sucesso" });
        } else {
            res.status(400).json({ message: "Email or password is wrong" })
        }
    } catch {
        res.status(400).json({ message: "Email or password is wrong" })
    }
}

const deleteColaborators = async (req, res) => {
    const id = req.params.id;
    await model.deleteColab(id);
    return res.status(204).json({});
}

const updateColaborators = async (req, res) => {
    const id = req.params.id;
    await model.putColab(id, req.body)
    return res.status(204).json({});
}

module.exports = {
    getColaborators,
    postColaborators,
    deleteColaborators,
    updateColaborators,
    loginColaborators
}