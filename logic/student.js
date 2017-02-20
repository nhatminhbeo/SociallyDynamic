// ===========================================================================
// File: /logic/student.js
// Description: Export API functions that handle requests at /api/student/*
// Author:
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

var User = require('general').User;

// ================================================================================
//  Function: postStudent
//  REST: POST:/api/student/
//  Description:
//  Expected input (req.body):
//  		- id : id String auto generated by firebase 
//          - email : String
//          - firstName : String
//			- lastName : String
//			- age : int
//			- Bio : String
//			- Email : String
//			- Major : String
//  Expected output (res):
//          - respond code: 201 for created (success)
//							400 for failed
//  Author: Minh Tran Quoc
// ================================================================================
exports.postStudent = function (req, res) {

};


// ================================================================================
//  Function: putStudentWithId
//  REST: PUT:/api/student/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Minh Tran Quoc
// ================================================================================
exports.putStudentWithId = function (req, res) {

};


// ================================================================================
//  Function: deleteStudentWithId
//  REST: DELETE:/api/student/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Minh Tran Quoc
// ================================================================================
exports.deleteStudentWithId = function (req, res) {
};


// ================================================================================
//  Function: getStudentWithId
//  REST: GET:/api/student/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Ruohan Hu
// ================================================================================
exports.getStudentWithId = function (req, res) {
	var studentID = req.params.id;
	
	// get a user with the ID
	User.findById(studentID, function(err, user) {
		if (err) throw err;
		// show the user
		console.log(user);
	}
};


// ================================================================================
//  Function: getStudentFriendWithId
//  REST: GET:/api/student/friend/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Ruohan Hu
// ================================================================================
exports.getStudentFriendWithId = function (req, res) {
	var stduentFriendID = req.params.id;

	// get a user with the ID
	User.findById(studentFriendID, function(err, user) {
		if (err) throw err;
		// show the user
		console.log(user);
	}
};