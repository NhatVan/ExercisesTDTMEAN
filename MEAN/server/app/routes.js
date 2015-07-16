'use strict';
module.exports = function(app){
	app.use('/api/todos',require('../app/api/todo'));
	app.route('/*').get(function(req,res){
		res.sendfile('./client/index.html');
	});
};