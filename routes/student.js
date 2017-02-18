// ===========================================================================
// File: /routes/student.js
// Description: Serve API functions to requests at route /api/student/*
// Author: Minh Tran Quoc
// Last updated: Feb 12 2017
// ===========================================================================

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

var api = require('../logic/student.js');
module.exports.route = function(app) {
	app.post('/api/student', api.postStudent);
	app.put('/api/student/:id', api.putStudentWithId);
	app.delete('/api/student/:id', api.deleteStudentWithId);
	app.get('/api/student/:id', api.getStudentWithId);
	app.get('/api/student/friend/:id', api.getStudentFriendWithId);
};