require("dotenv").config()

const express = require("express")
const router = require("./router/router")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin: [`${process.env.URL_FRONT_END}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())
app.use("/api", router)

app.listen(PORT, '0.0.0.0')