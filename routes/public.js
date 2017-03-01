// ===========================================================================
// File: /view/public.js
// Description: Serve html files to public route
// Author: Minh Tran Quoc
// Last updated: Feb 12 2017
// ===========================================================================

// ==============================================================================================================================
// Public Routes
//
//    Path          |   Method    |   Purpose / Brief Description
// ==============================================================================================================================
//    /             |   GET       |   Home page -- sends public/view/index.html
//    /login        |   GET       |   Login page -- sends public/view/login.hmtl
//    /group        |   GET       |   General Group page -- sends public/view/groups.html
//    /group/:id    |   GET       |   A Specific Group page -- sends public/view/group.html
//    /profile/:id  |   GET       |   View a student's profile -- sends public/view/user.html
//    /match        |   GET       |   Show possible matches page -- sends public/view/match.html
// ==============================================================================================================================

module.exports.route = function (app, dirname) {

	app.get('/', function (req, res) {
		console.log('hello world');
		console.log(dirname + "/view/index.html");
		res.sendFile(dirname + "/view/index.html");
	});

	// this is to make sure our 404 page gets displayed if some random route is typed in the URL bar 
	app.get('/:name', function (req, res) {
			console.log('hello world');
			console.log(dirname + "/view/index.html");
			res.sendFile(dirname + "/view/index.html");
	});

	app.get('/scenes/:name', function(req, res) {
		res.sendFile(dirname + "/view/scenes/" + req.params.name + ".html");
	});

	app.get('/group/conversation/:id', function(req,res){
		res.sendFile(dirname + "/view/index.html");
	});
	
	app.get('/:name/:id', function(req,res){
		console.log(dirname + "/view/index.html");
		res.sendFile(dirname + "/view/index.html");
	});
};