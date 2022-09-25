const express = require('express');
const usersRouter = express.Router();
const {register, getAllUsers}= require('../controllers/users');


usersRouter.post("/register", register);
usersRouter.get("/", getAllUsers);


module.exports = usersRouter;