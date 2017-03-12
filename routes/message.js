// ===========================================================================
// File: /routes/message.js
// Description: Serve API functions to requests at route /api/message/*
// Author: Minh Tran Quoc
// Last updated: Feb 12 2017
// ===========================================================================

//    Path                    |   Method    |   Purpose / Brief Description
// ===============================================================================================================================================
//                                   Message systems (PM)
// ===============================================================================================================================================
//    /api/message/           |   GET       |   Return messages in an interval (from most interval) between two students defined in request body.
//    /api/message/           |   PUT       |   Check all messages between two students, sent by a student desribed in request body as seen. 
//    /api/message/           |   POST      |   Post a message between two students, one is the sender, in request body
// ===============================================================================================================================================

var api = require('../logic/message');
module.exports.route = function(app, io) {
	app.get('/api/conversation', api.getConversation);
	app.post('/api/conversation', api.postConversation);
	app.get('/api/conversation/:id', api.getConversationWithId);
	app.put('/api/conversation/:id', api.putConversationWithId);

	io.on('connection', function(socket) {
		api.onPersonalMessageReceived(socket, io);
	});
};