const express = require("express");

const userController = require("./controllers/user.controllers");

const app = express();

app.use(express.json());

app.use("/users", userController);

app.post("/register", register)

app.post("/login", login)

module.exports = app;
