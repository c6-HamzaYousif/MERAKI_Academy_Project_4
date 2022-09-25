const express = require('express');
const rolesRouter = express.Router();
const {addRole} = require('../controllers/roles');

rolesRouter.post('/', addRole)


module.exports = rolesRouter;