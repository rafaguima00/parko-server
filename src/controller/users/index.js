const model = require("../../model/users");
const bcrypt = require("bcrypt");

const login = [];

const getUsers = async (req, res) => {
    const getAllUsers = await model.getUsers();
    res.status(200).json(getAllUsers);
}

const postUsers = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const createUser = await model.postUsers(req.body, hashedPassword);
    res.status(201).json(createUser);
}

const deleteUsers = async (req, res) => {
    const id = req.params.id;
    await model.deleteUsers(id);
    return res.status(204).json({});
}

const putUsers = async (req, res) => {
    const id = req.params.id;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await model.updateUsers(req.body, id, hashedPassword);
    return res.status(204).json({});
}

const loginUsers = async (req, res) => {
    const email = req.body.email;
    const allUsers = await model.getUsers();
    const findUser = allUsers.find(item => item.email === email);

    if(findUser === null) {
        return res.status(400).json({ message: "Email or password invalid" });
    }

    try {
        if(await bcrypt.compare(req.body.password, findUser.password)) {
            login.push(req.body);
            res.status(201).json(login);
        } else {
            return res.status(400).json({ message: "Email or password invalid" });
        }
    } catch {
        return res.status(400).json({ message: "Email or password invalid" });
    }
}

module.exports = {
    getUsers,
    postUsers,
    deleteUsers,
    putUsers,
    loginUsers
}