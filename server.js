// ===========================================================================
// File: server.js
// Description: Main javascript file for the app.
//              Contains server configuration, server startup, server error
//              handling, routings
// Author: Minh Tran Quoc
// Last updated: Mar 14 2017
// ===========================================================================


// =========================
// External libraries
// =========================
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var socket = require('socket.io');


// =========================
// Server creation, express
// and socket.io initialization
// =========================
var app = express();
var server = require('http').createServer(app);
var io = socket.listen(server);
var port = process.env.PORT || 3000;


// =========================
// App Configs
// =========================
// View files are in /public/view
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.disable('x-powered-by');


// =========================
// Allowing CORS
// =========================
app.use(function(req,res,next) {
  res.append('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.append('Access-Control-Allow-Credentials', 'true');
  res.append('Access-Control-Allow-Methods', ['GET', 'OPTIONS', 'PUT', 'POST', 'DELETE']);
  res.append('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.enable('trust proxy');


// =========================
// Start server listening
// =========================
server.listen(port, function() {
  console.log('Server running!');
});


// =========================
// Rest API Routings
// =========================
var stu = require('./routes/student');  stu.route(app);
var fri = require('./routes/friend');   fri.route(app);
var mat = require('./routes/match');    mat.route(app);
var mes = require('./routes/message');  mes.route(app, io);
var gro = require('./routes/group');    gro.route(app);
var inb = require('./routes/inbox');    inb.route(app);
var dat = require('./routes/data');     dat.route(app);


// =========================
// Public Routings
// =========================
var pub = require('./routes/public');   pub.route(app, __dirname);