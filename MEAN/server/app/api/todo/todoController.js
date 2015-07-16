'use strict';

var todoService = require('./todoService');
exports.postNewTodo = function(req,res){
	console.log(req.body);
	todoService.postNewTodo(req.body).then(function(responseMessage){
		var resJson = responseMessage.toJson();
		return res.json(resJson.status, resJson);
	});
};

exports.getTodos = function(req,res){
	todoService.getTodos().then(function(responseMessage){
	    var resJson = responseMessage.toJson();
	    return res.json(resJson.status, resJson);
	});
};

exports.deleteTodos = function(req, res){
	var id  = req.params.id;
	console.log(id);
	todoService.deleteTodos(id).then(function(responseMessage){
	    var resJson = responseMessage.toJson();
	    return res.json(resJson.status, resJson);
	});
};

exports.updateTodos = function(req,res){
	var id = req.params.id;
	var data = req.body;
	todoService.updateTodos(id,data).then(function(responseMessage){
	    var resJson = responseMessage.toJson();
	    return res.json(resJson.status, resJson);
	});
};

exports.deleteAllTodos = function(req,res){
	todoService.deleteAllTodos().then(function(responseMessage){
	    var resJson = responseMessage.toJson();
	    return res.json(resJson.status, resJson);
	});
};