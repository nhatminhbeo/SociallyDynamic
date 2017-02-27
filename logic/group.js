// ===========================================================================
// File: /logic/group.js
// Description: Export API functions that handle requests at /api/group/*
// Author:
// Last updated: Feb 12 2017
// ===========================================================================
var models = require('./general');
var mongoose = require('mongoose');
var Group = models.Group;

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

// ================================================================================
//  Function: postGroup
//  REST: POST:/api/group
//  Description: Create a new group entry and post it into the database
//  Expected input (req.body): Expects groupname and owner
//  Expected output (res): Sends back the json of the entry
//  Author: Khiem Tran
// ================================================================================
module.exports.postGroup = function (req, res) {
    var toPost = Group({
    	GroupName: req.body.groupname,
    	Owner: req.body.owner
    });

    toPost.save(function(err, entry) {
    	if(err)
    		res.status(400).send('Something Broke');
    	res.status(200).send(entry);
    });
};

// ================================================================================
//  Function: getGroupWithId
//  REST: GET:/api/group/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Khiem Tran
// ================================================================================
module.exports.getGroupWithId = function (req, res) {

};


// ================================================================================
//  Function: putGroupWithId
//  REST: PUT:/api/group/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Khiem Tran
// ================================================================================
module.exports.putGroupWithId = function (req, res) {

};


// ================================================================================
//  Function: deleteGroupWithId
//  REST: DELETE:/api/group/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Khiem Tran
// ================================================================================
module.exports.deleteGroupWithId = function (req, res) {

};


// ================================================================================
//  Function: postGroupWithIdUser
//  REST: POST:/api/group/:id/user
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.postGroupWithIdUser = function (req, res) {

};


// ================================================================================
//  Function: deleteGroupWithIdUser
//  REST: DELETE:/api/group/:id/user
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.deleteGroupWithIdUser = function (req, res) {

};

// ================================================================================
//  Function: postGroupWithIdUser
//  REST: POST:/api/group/:id/user
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.postGroupWithIdRequest = function (req, res) {

};


// ================================================================================
//  Function: deleteGroupWithIdRequest
//  REST: DELETE:/api/group/:id/user
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.deleteGroupWithIdRequest = function (req, res) {

};

// ================================================================================
//  Function: getGroupUserWithId
//  REST: GET:/api/group/user/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.getGroupUserWithId = function (req, res) {

};