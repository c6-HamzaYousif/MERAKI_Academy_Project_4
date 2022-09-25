const express = require('express');
const rolesRouter = express.Router();
const {addRole, updateRole} = require('../controllers/roles');

rolesRouter.post('/', addRole)
rolesRouter.put('/:id', updateRole)

module.exports = rolesRouter;