const express = require("express");

const userCont = require("./controlllers/user.conttrolers");

const app = express();

app.use(express.json());
app.use("/users",userCont);
module.exports = app;