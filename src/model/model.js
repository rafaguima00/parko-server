require("dotenv").config()
const mysql = require("mysql2/promise")

const conn = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

module.exports = conn;