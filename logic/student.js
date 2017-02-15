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

// ================================================================================
//  Function: postStudent
//  REST: POST:/api/student/
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
exports.postStudent = function (req, res) {

};


// ================================================================================
//  Function: putStudentWithId
//  REST: PUT:/api/student/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
exports.putStudentWithId = function (req, res) {

};


// ================================================================================
//  Function: deleteStudentWithId
//  REST: DELETE:/api/student/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
exports.deleteStudentWithId = function (req, res) {

};


// ================================================================================
//  Function: getStudentWithId
//  REST: GET:/api/student/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
exports.getStudentWithId = function (req, res) {

};


// ================================================================================
//  Function: getStudentFriendWithId
//  REST: GET:/api/student/friend/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
exports.getStudentFriendWithId = function (req, res) {

}