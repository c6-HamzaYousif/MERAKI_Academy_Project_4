const express = require('express');
const commentsRouter = express.Router();
const addComments = require('../controllers/comments');

commentsRouter.post('/add/:id', addComments)

module.exports = commentsRouter;