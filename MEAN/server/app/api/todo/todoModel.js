'use strict';
var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var todoModel = new Schema({
	title:String,
	completed:Boolean
});

module.exports = mongoose.model('todoModel',todoModel);