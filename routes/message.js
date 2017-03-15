// ===========================================================================
// File: /routes/message.js
// Description: Serve API functions to requests at route /api/conversation/*
// Author: Minh Tran Quoc
// Last updated: Mar 14 2017
// ===========================================================================

// ===============================================================================================================================================
//    Path                    |   Method    |   Purpose / Brief Description
// ===============================================================================================================================================
//                                   Message systems (PM)
// ===============================================================================================================================================
//    /api/conversatoin/           |   GET       |   Return convesation id between two students
//    /api/conversation/           |   POST      |   Create conversation between two students
//    /api/conversation/:id        |   GET 	     |   Return the 15 sorted messages starting from ith message
//    /api/conversation/:id        |   PUT 	     |   Update "seen" field of conversation between 2 students
//    /api/group/conversation/:id  |   GET 	     |   Return the 15 sorted messages starting from ith message of a group conversation
// ===============================================================================================================================================

var api = require('../logic/message');
module.exports.route = function(app, io) {
	app.get('/api/conversation', api.getConversation);
	app.post('/api/conversation', api.postConversation);
	app.get('/api/conversation/:id', api.getConversationWithId);
	app.put('/api/conversation/:id', api.putConversationWithId);
	app.get('/api/group/conversation/:id', api.getGroupConversationWithId);

	// Delegate personal conversation and group conversation
	io.on('connection', function(socket) {
		api.onPersonalMessageReceived(socket, io);
		api.onGroupMessageReceived(socket, io);
	});
};