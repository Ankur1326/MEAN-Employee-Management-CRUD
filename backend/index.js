const express = require("express")
const bodyParse = require("body-parser")
const cors = require("cors")

const mongoose = require('./db')
const routes = require('./routes/routes')

const config = {
    port : "3000",
    corsOption: { origin: "http://localhost:4200"}
}

const app = express();

app.use(bodyParse.json()) // use body-parse middleware for JSON parsing 
app.use(cors(config.corsOption))

app.listen(config.port, () => console.log(`Server started at port : ${config.port}`))

app.use("/employees", routes)