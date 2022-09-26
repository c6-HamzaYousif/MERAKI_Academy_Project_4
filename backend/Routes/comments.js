const express = require('express');
const commentsRouter = express.Router();
const addComments = require('../controllers/comments');

rolesRouter.post('/add', addComments)

module.exports = commentsRouter;