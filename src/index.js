require("dotenv").config();

const express = require("express");
const router = require("./router/router");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(PORT, () => console.log(`Parko server running at ${PORT} port...`));