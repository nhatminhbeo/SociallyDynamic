// ===========================================================================
// File: server.js
// Description: Main javascript file for the app.
//              Contains server configuration, server startup, server error
//              handling
// Author: Minh Tran Quoc
// Last updated: Feb 12 2017
// ===========================================================================
// backend
// sup
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var http = require('http');
var app = express();

 
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
// Start Listening Requests
// =========================
app.listen(port, function() {
  console.log('Server running!');
});


// =========================
// 404 Handlers
// =========================
/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.sendFile(__dirname + "/view/404.html");
});
*/
// =========================
// Routings
// =========================


// ===============================================================================================================================================
// RESTful API endpoints
// ===============================================================================================================================================
//
//    Path                    |   Method    |   Purpose / Brief Description                             |   File:function
// ===============================================================================================================================================
//                                   Student (USA + UPV + MS + MUP)
// ===============================================================================================================================================
//    /api/student/           |   POST      |   Create a student profile.                               |
//    /api/student/:id        |   PUT       |   Modify a student profile.                               |
//    /api/student/:id        |   DELETE    |   Delete a student profile.                               |
//    /api/student/:id        |   GET       |   Get a student profile.                                  |
//    /api/student/friend/:id |   GET       |   Get friend list of a student.                           |
// ===============================================================================================================================================
//                                   Inbox (IB)
// ===============================================================================================================================================
//    /api/inbox/message/:id  |   GET       |   Get list of conversations of a student.                 |
//    /api/inbox/friend/:id   |   GET       |   Get list of friend request of a student.                |
//    /api/inbox/group/:id    |   GET       |   Get list of group invitation of a student.              |
// ===============================================================================================================================================
//                                   Friendship (MF + UPV + PM)
// ===============================================================================================================================================
//    /api/friend/            |   GET       |   Get the friendship between two students.
//    /api/friend/            |   POST      |   Create new friendship between two students.
//    /api/friend/            |   DELETE    |   Delete a friendship between two students.
//    /api/friend/request     |   POST      |   Create new friend request from sender to receiver.
//    /api/friend/request     |   DELETE    |   Delete a friend request from sender to receiver.
// ===============================================================================================================================================
//                                   Group (MSG)
// ===============================================================================================================================================
//    /api/group/             |   POST      |   Create a group profile.
//    /api/group/:id          |   GET       |   Get a group profile.
//    /api/group/:id          |   PUT       |   Modify a group profile.
//    /api/group/:id          |   DELETE    |   Delete a group profile.
//    /api/group/:id/user     |   POST      |   Add a student to a group.
//    /api/group/:id/user     |   DELETE    |   Delete a student from a group.
//    /api/group/:id/request  |   POST      |   Create a new invitation of a user to a group.
//    /api/group/:id/request  |   DELETE    |   Delete an invitation of a user to a group.
//    /api/group/user/:id     |   GET       |   Get list of groups of a student.
// ===============================================================================================================================================
//                                   Partner match (PM)
// ===============================================================================================================================================
//    /api/match/class/:id    |   GET       |   Get a list of potential partners prioritizing class.
//    /api/match/habit/:id    |   GET       |   Get a list of potential partners prioritizing habit.
//    /api/match/major/:id    |   GET       |   Get a list of potential partners prioritizing major.
// ===============================================================================================================================================
//                                   Message systems (PM)
// ===============================================================================================================================================
//    /api/message/           |   GET       |   Return messages in an interval between two students.
//    /api/message/           |   PUT       |   Check conversation between two students as seen. 
//    /api/message/           |   POST      |   Create a message between two students.
// ===============================================================================================================================================


// =========================
// Routings
// =========================
/*
var stu = require('./routes/student');  stu.route(app);
var mat = require('./routes/match');    mat.route(app);
var fri = require('./routes/friend');   fri.route(app);
var mes = require('./routes/message');  mes.route(app);
var gro = require('./routes/group');    gro.route(app);
var inb = require('./routes/inbox');    inb.route(app);
*/

var pub = require('./routes/public');   pub.route(app, __dirname);
