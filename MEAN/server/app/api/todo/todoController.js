'use strict';
//var Todo = require('./todoModel');
var todoService = require('./todoService');
exports.postNewTodo = function(req,res){
	console.log(req.body);
	todoService.postNewTodo(req.body).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	});
};
exports.getTodos = function(req,res){
	todoService.getTodos().then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	});
};

exports.deleteTodos = function(req, res){
	var id  = req.params.id;
	console.log(id);
	todoService.deleteTodos(id).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	});
};

exports.updateTodos = function(req,res){
	var id = req.params.id;
	var data = req.body;
	todoService.updateTodos(id,data).then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	});
};

exports.deleteAllTodos = function(req,res){
	todoService.deleteAllTodos().then(function(responseMessage){
		var data = responseMessage.toJson();
		return res.json(data.status,data);
	});
};