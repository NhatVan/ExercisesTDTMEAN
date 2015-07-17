'use strict';
var express = require('express');
var router = express.Router();
var todoController = require('./todoController');

router.post('/',todoController.postNewTodo);

router.get('/',todoController.getTodos);
router.delete('/:id',todoController.deleteTodos);
router.delete('/', todoController.cleanUpTodos);
router.put('/:id',todoController.updateTodos);
module.exports = router;