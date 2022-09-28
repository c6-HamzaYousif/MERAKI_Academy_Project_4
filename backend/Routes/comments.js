const express = require('express');
const commentsRouter = express.Router();
const {addComments, getAllComments} = require('../controllers/comments');

commentsRouter.post('/add/:id', addComments)
commentsRouter.get('/:id', getAllComments)

module.exports = commentsRouter;