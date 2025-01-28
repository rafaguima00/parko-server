require("dotenv").config()

const express = require("express")
const router = require("./router/router")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin: ["http://localhost:3000", "https://parkoapp.com.br"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json())
app.use("/api", router)

app.listen(PORT)