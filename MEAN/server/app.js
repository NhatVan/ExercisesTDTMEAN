'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var morgan = require('morgan');
var domain = require('domain');
var d = domain.create();
d.on('error', function(err) {
    console.log(err);
});

d.run(function() {
    //config database
    var db = require('./config/db');
    //set our port
    var port = process.env.PORT || 3000;
    //connect to our mongoDB database
    mongoose.connect(db.url); 
    var app = express();
    app.use(morgan('dev'));
    require('../client/js/jsextension');
    //get all data 
    //parse application/json
    app.use(bodyParser.json());

    // parse application/vnd.api+json as json
    app.use(bodyParser.json({
        type: 'application/vnd.api+json'
    }));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(methodOverride('X-HTTP-Method-Override'));

    //set the static front-end files
    app.use(express.static(__dirname+'/../'+'client'));
    //config route
    require('./app/routes')(app);
    //start app
    //listen at port: 3000
    app.listen(port);
    console.log('Server started, listen on port:'+port);
    exports = module.exports = app;

});
