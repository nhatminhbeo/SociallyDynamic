// ===========================================================================
// File: /view/public.js
// Description: Serve html files to public route
// Author: Minh Tran Quoc
// Last updated: Mar 14 2017
// ===========================================================================

// ==============================================================================================================================
// Public Routes
//
//    Path          |   Method    |   Purpose / Brief Description
// ==============================================================================================================================
//    /             |   GET       |   Home page -- sends public/view/index.html
//    /:name        |   GET       |   Delegate to Angular Routing -- sends public/view/index.html 
//    /*	        |   GET       |   Delegate to Angular Routing -- sends public/view/index.html 
//    /scenes/:name |   GET       |   Serve view partials for Angular view
// ==============================================================================================================================

module.exports.route = function (app, dirname) {

	app.get('/', function (req, res) {
		res.sendFile(dirname + "/view/index.html");
	});

	// this is to make sure our 404 page gets displayed if some random route is typed in the URL bar 
	app.get('/:name', function (req, res) {
			res.sendFile(dirname + "/view/index.html");
	});

	app.get('/scenes/:name', function(req, res) {
		res.sendFile(dirname + "/view/scenes/" + req.params.name + ".html");
	});


	app.get('*', function(req,res){
		res.sendFile(dirname + "/view/index.html");
	});

};