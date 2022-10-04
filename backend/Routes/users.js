const express = require('express');
const usersRouter = express.Router();
const {register, getAllUsers, login, editProfile}= require('../controllers/users');


usersRouter.post("/register", register);
usersRouter.get("/", getAllUsers);
usersRouter.post("/login", login);
usersRouter.put("/edit/:id", editProfile);



module.exports = usersRouter;