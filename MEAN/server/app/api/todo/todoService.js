'use strict';
var Todo = require('./todoModel');
exports.postNewTodo = function(data) {
    var def = require('../common/model/promise').create();
    var newTodo = new Todo({
        title: data.title,
        completed: data.completed
    });
    var responseMessage = require('../common/model/responseMessage').create();
    newTodo.save(function(err, todoSave) {
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);

        } else {
            responseMessage.setStatus(200);
            responseMessage.setData(todoSave);

        }
        def.resolve(responseMessage);

    });
    return def;
};

exports.getTodos = function() {
    var def = require('../common/model/promise').create();
    Todo.find({}, function(err, items) {
        var responseMessage = require('../common/model/responseMessage').create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
        } else {
            responseMessage.setStatus(200);
            responseMessage.setData(items);
        }
        def.resolve(responseMessage);
    });
    return def;
};

exports.deleteTodos = function(id) {
  console.log(id);
    var def = require('../common/model/promise').create();
    Todo.findByIdAndRemove(id, function(err, item) {
        var responseMessage = require('../common/model/responseMessage').create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
        } else {
            responseMessage.setStatus(200);

        }
        def.resolve(responseMessage);
    });
    return def;
};

exports.updateTodos = function(id, data) {
    var def = require('../common/model/promise').create();
    Todo.findByIdAndUpdate(id, data, function(err, item) {
        var responseMessage = require('../common/model/responseMessage').create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
        } else {
            responseMessage.setStatus(200);
            responseMessage.setData(item);
        }
        def.resolve(responseMessage);
    });
    return def;
};

exports.deleteAllTodos = function() {
    var def = require('../common/model/promise').create();
    Todo.remove({}, function(err) {
        var responseMessage = require('../common/model/responseMessage').create();
        if (err) {
            console.log(err);
            responseMessage.setStatus(500);
        } else {
            responseMessage.setStatus(200);

        }
        def.resolve(responseMessage);
    });
    return def;
};
