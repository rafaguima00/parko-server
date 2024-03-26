require("dotenv").config();
const model = require("../../model/colaborators");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getColaborators = async (req, res) => {
    const result = await model.getColab();
    res.status(200).json(result);
};

const getColaboratorsById = async (req, res) => {
    const id = req.params.id;
    const result = await model.getColaboratorById(id);
    res.status(200).json(result);
};

const postColaborators = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const result = await model.postColab(req.body, hashedPassword);
    return res.status(201).json(result);
};

const loginColaborators = async (req, res) => {
    const email = req.body.email.toLowerCase();
    const users = await model.getColab();
    const userLogin = users.find(item => item.email.toLowerCase() === email);

    if(userLogin === null) {
        return res.status(400).json({})
    } 
        
    try {
        if (await bcrypt.compare(req.body.password, userLogin.password)) {
            const token = jwt.sign({ user: userLogin }, process.env.PRIVATE_KEY, { expiresIn: 1800 });

            res.status(201).json({ token });
        } else {
            res.status(400).json({ message: "E-mail or password is wrong" })
        }
    } catch {
        res.status(400).json({ message: "E-mail or password is wrong" })
    }
};

const deleteColaborators = async (req, res) => {
    const id = req.params.id;
    await model.deleteColab(id);
    return res.status(204).json({});
};

const updateColaborators = async (req, res) => {
    const id = req.params.id;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    await model.putColab(id, req.body, hashedPassword)
    return res.status(204).json({});
};

module.exports = {
    getColaborators,
    getColaboratorsById,
    postColaborators,
    deleteColaborators,
    updateColaborators,
    loginColaborators
};