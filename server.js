var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var http = require('http');
var app = express();

var PORT = process.env.PORT || 3000;
app.set('port', PORT);

var server = http.createServer(app);


// =========================
// App Configs
// =========================
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
// Start Listening Requests
// =========================
server.listen(PORT, function() {
  console.log('Server running!');
});


// =========================
// Routings
// =========================

// ================================================================================================
// Public Routes
//
//    Path          |   Method    |   Purpose / Description
// ================================================================================================
//    /             |   GET       |   Home page -- sends public/view/index.html
//    /login        |   GET       |   Login page -- sends public/view/login.hmtl
//    /groups       |   GET       |   General Group page -- sends public/view/groups.html
//    /groups/:id   |   GET       |   A Specific Group page -- sends public/view/group.html
//    /user         |   GET       |   View current user's profile + edit -- sends public/view/user.html
//    /user/:id     |   GET       |   View other user's profile -- sends public/view/user.html
//    /match        |   GET       |   Show possible matches page -- sends public/view/match.html
// ================================================================================================

// ================================================================================================
// RESTful API endpoints
//
//    Path          |   Method    |   Purpose / Description
// ================================================================================================
//    /x            |   X       |   X
// ================================================================================================
