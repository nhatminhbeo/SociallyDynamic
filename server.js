// ===========================================================================
// File: server.js
// Description: Main javascript file for the app.
//              Contains server configuration, server startup, server error
//              handling
// Author: Minh Tran Quoc
// Last updated: Feb 12 2017
// ===========================================================================

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
server.listen(port, function() {
  console.log('Server running!');
});


// =========================
// 404 Handlers
// =========================

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
  res.sendFile(__dirname + "/public/404.html");
});

// =========================
// Routings
// =========================


// ===============================================================================================================================================
// RESTful API endpoints
// ===============================================================================================================================================
//
//    Path                    |   Method    |   Purpose / Brief Description
// ===============================================================================================================================================
//                                   Student (USA + UPV + MS + MUP)
// ===============================================================================================================================================
//    /api/student/           |   POST      |   Create a student with criteria(JSON) in request body
//    /api/student/:id        |   PUT       |   Modify a student defined by id with new criteria(JSON) in request body
//    /api/student/:id        |   DELETE    |   Delete a student defined by id
//    /api/student/:id        |   GET       |   Get profile of a student as JSON object
//    /api/student/friend/:id |   GET       |   Get a list of friends (name, profile pic, id) of user defined by id
// ===============================================================================================================================================
//                                   Inbox (IB)
// ===============================================================================================================================================
//    /api/inbox/message/:id  |   GET       |   Get list of message boxes of student described by id with other students or groups
//    /api/inbox/friend/:id   |   GET       |   Get list of friend request of student described by id from other students
//    /api/inbox/group/:id    |   GET       |   Get list of group invitation of student described by id from other students
// ===============================================================================================================================================
//                                   Friendship (MF + UPV + PM)
// ===============================================================================================================================================
//    /api/friend/            |   GET       |   Get the friendship between two students described in request body
//    /api/friend/            |   POST      |   Create new friendship between two students described in request body
//    /api/friend/            |   DELETE    |   Delete a friendship between two students described in request body 
//    /api/friend/request     |   POST      |   Create new friend request from sender to receiver described in request body
//    /api/friend/request     |   DELETE    |   Delete a friend request from sender to receiver described in request body
// ===============================================================================================================================================
//                                   Group (MSG)
// ===============================================================================================================================================
//    /api/group/             |   POST      |   Create a group with criteria(JSON) in request body
//    /api/group/:id          |   GET       |   Get information of a group defined by id
//    /api/group/:id          |   PUT       |   Change info of a group defined by id with new criteria(JSON) in request body
//    /api/group/:id          |   DELETE    |   Delete a group defined by id
//    /api/group/:id/user     |   POST      |   Add a student (described by request body) to group described by id
//    /api/group/:id/user     |   DELETE    |   Delete a student (described by request body) from group described by id
//    /api/group/:id/request  |   POST      |   Create a new invitation to group desribed by id from sender to receiver in body
//    /api/group/:id/request  |   DELETE    |   Delete an invitation to group desribed by id from sender to receiver in body
//    /api/group/user/:id     |   GET       |   Get list of groups of a student
// ===============================================================================================================================================
//                                   Partner match (PM)
// ===============================================================================================================================================
//    /api/match/class/:id    |   GET       |   Get a list of potential partners for student described by id, priority class
//    /api/match/habit/:id    |   GET       |   Get a list of potential partners for student described by id, priority habit
//    /api/match/major/:id    |   GET       |   Get a list of potential partners for student described by id, priority major
// ===============================================================================================================================================
//                                   Message systems (PM)
// ===============================================================================================================================================
//    /api/message/           |   GET       |   Return messages in an interval (from most interval) between two students defined in request body.
//    /api/message/           |   PUT       |   Check all messages between two students, sent by a student desribed in request body as seen. 
//    /api/message/           |   POST      |   Post a message between two students, one is the sender, in request body
// ===============================================================================================================================================
