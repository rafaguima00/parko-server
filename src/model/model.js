require("dotenv").config();
const mysql = require("mysql2/promise");

const conn = mysql.createPool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports = conn;