// ===========================================================================
// File: /routes/group.js
// Description: Serve API functions to requests at route /api/group/*
// Author: Minh Tran Quoc
// Last updated: Feb 12 2017
// ===========================================================================

//    Path                    |   Method    |   Purpose / Brief Description
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

var api = require('../logic/group');
module.exports.route = function(app) {
	app.post('/api/group', api.postGroup);
	app.get('/api/group/:id', api.getGroupWithId);
	app.put('/api/group/:id', api.putGroupWithId);
	app.delete('/api/group/:id', api.deleteGroupWithId);
	app.post('api/group/:id/user', api.postGroupWithIdUser);
	app.delete('api/group/:id/user', api.deleteGroupWithIdUser);
	app.post('api/group/:id/request', api.postGroupWithIdRequest);
	app.delete('api/group/:id/request', api.postGroupWithIdRequest);
	app.get('api/group/user/:id', api.getGroupUserWithId);
};
// TODO