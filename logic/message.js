// ===========================================================================
// File: /logic/message.js
// Description: Export API functions that handle requests at /api/message/*
// Author:
// Last updated: Feb 12 2017
// ===========================================================================


// ===============================================================================================================================================
//                                   Message systems (PM)
// ===============================================================================================================================================
//    /api/conversation/:id   |   GET       |   Return messages in an interval of a certain conversation defined in parameter.
// ===============================================================================================================================================

// ================================================================================
//  Function: getConversationWithId
//  REST: GET:/api/conversation/:id
//  Description: Return a list 50 most recent message by default, otherwise
//				 specified in req.header
//  Expected input (req.header): JSON:
//		start: int -- starting most of 50 most recent messages.
//			i.e req.header.start: 100 will return 101th to 150th most recent messages 
//  Expected output (res): JSON list:
//		[ {
//			Sender: String -- id of the sender,
//			SenderFirstName: String -- First name of the sender,
//		},
//			.......
//		]
//  Author: 
// ================================================================================
module.exports.getConversationWithId = function (req, res) {
};


// ================================================================================
//  Function: messageReceived
//  REST: GET:/api/message/
//  Description:
//  Expected input (emit('personal message', data)): 
//			data.Content: String -- the message that is sent
//			data.ConversationID: String -- id of the CONVERSATION, not user
//			data.Sender: String -- id of Sender, which is a user
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.onPersonalMessageReceived = function (socket) {

	// Listen to personal message events to know which 
	// conversation id to listen to
	socket.on('personal message', function (data) {

		// Now, as we know the conversation id, create a dynamic
		// personal message + data.ConversationId to listen to a specific message
		// from a specific conversation.
		socket.on('personal message ' + data.ConversationID, function(message) {

			// Find the student so the other end knows the name of the sender
			models.Student.findOneById(message.Sender).exec()
			.then(function (student) {
				message["SenderName"] = student.FirstName;

				// Now, fire the message back to whoever is in that conversation.
				socket.emit('personal message ' + data.conversationID, message);

				// And, store the message to database
				return models.Message({
					ConversationID: data.ConversationID,
					Content: message.Content,
					Sender: message.Sender
				}).save();
			})

			// Successfully added message to database
			.then (function () {
				console.log('mesasge added to ' + data.ConversationID);
			})

			// Failed to add message to database
			.then (null, function () {
				console.log('message failed to add to ' + data.ConversationID);
			});
			
		});
	});
};
