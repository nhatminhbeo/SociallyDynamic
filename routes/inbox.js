// ===========================================================================
// File: /routes/inbox.js
// Description: Serve API functions to requests at route /api/inbox/*
// Author:
// Last updated: Feb 12 2017
// ===========================================================================

//    Path                    |   Method    |   Purpose / Brief Description
// ===============================================================================================================================================
//                                   Inbox (IB)
// ===============================================================================================================================================
//    /api/inbox/message/:id  |   GET       |   Get list of message boxes of student described by id with other students or groups
//    /api/inbox/friend/:id   |   GET       |   Get list of friend request of student described by id from other students
//    /api/inbox/group/:id    |   GET       |   Get list of group invitation of student described by id from other students
// ===============================================================================================================================================

var api = require('../logic/inbox.js');
module.exports.route = function(app) {
	app.get('/api/inbox/message/:id', api.getInboxMessageWithId);
	app.get('/api/inbox/friend/:id', api.getMInboxFriendWithId);
	app.get('/api/inbox/group/:id', api.getInboxGroupWithId);
};