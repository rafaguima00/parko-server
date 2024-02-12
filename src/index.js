require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const router = require("./router/router");
const cors = require("cors");

app.use(express.json());
app.use(router);
app.use(cors());

app.listen(PORT, () => console.log(`Parko server running at ${PORT} port...`));