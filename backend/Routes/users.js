const express = require('express');
const usersRouter = express.Router();
const {register, getAllUsers, login}= require('../controllers/users');


usersRouter.post("/register", register);
usersRouter.get("/", getAllUsers);
usersRouter.post("/login", login);


module.exports = usersRouter;