// ===========================================================================
// File: /logic/message.js
// Description: Export API functions that handle requests at /api/message/*
// Author:
// Last updated: Feb 12 2017
// ===========================================================================


// ===============================================================================================================================================
//                                   Message systems (PM)
// ===============================================================================================================================================
//    /api/message/           |   GET       |   Return messages in an interval (from most interval) between two students defined in request body.
//    /api/message/           |   PUT       |   Check all messages between two students, sent by a student desribed in request body as seen. 
//    /api/message/           |   POST      |   Post a message between two students, one is the sender, in request body
// ===============================================================================================================================================

// ================================================================================
//  Function: getMessage
//  REST: GET:/api/conversation/:id
//  Description: Return a list 50 most recent message by default, otherwise
//				 specified in req.header
//  Expected input (req.header): JSON:
//		start: int -- starting most of 50 most recent message.
//			i.e start: 50 will return 51st to 100th most recent messages 
//  Expected output (res): JSON list:
//		[ {
//			Sender: String -- id of the sender,
//			SenderFirstName: String -- First name of the sender,
//			
//		}
//		]
//  Author: 
// ================================================================================
module.exports.getConversationWithId = function (req, res) {
};


// ================================================================================
//  Function: messageReceived
//  REST: GET:/api/message/
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.messageReceived = function (req, res) {

};
