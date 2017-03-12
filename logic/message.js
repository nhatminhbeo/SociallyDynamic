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

var models = require('./general');

// ================================================================================
//  Function: getConversation
//  REST: GET:/api/conversation
//  Description: Get conversation ID between two people, see whether or not it
//					exists
//  Expected input (req.header): JSON:
//		first: String -- id of one person
//		second: String -- id of second person
//		
//  Expected output (res): ConversationID of the conversation between two people.
//					This is null if conversation between two people doesn't exist
//  Author: 
// ================================================================================
module.exports.getConversation = function (req, res) {

	var toFind = {
    	UserID: req.headers.first
    };
    var toFindAlt = {
    	UserID: req.headers.second
    };


	models.Conversation.findOne({ '$and': [toFind, toFindAlt]}).exec()

	.then(function (conversation) {
		return res.status(200).send({"ConversationID": conversation._id});
	})

	.then(null, function() {
		return res.status(400).send({"ConversatoinID": null});
	})
};

// ================================================================================
//  Function: postConversation
//  REST: POST:/api/conversation
//  Description: Create a new conversation between two people.
//  Expected input (req.body): JSON:
//		First: id of the one person
//		Second: id of the second person
//
//  Expected output (res): {ConversationID: of the newly created conversation}
//  Author: 
// ================================================================================
module.exports.postConversation = function (req, res) {
	var conversation = models.Conversation({
		StudentID: [req.body.First, req.body.Second],
		Student1Seen: 0,
		Student2Seen: 0
	});

	conversation.save(function (err) {
		if (err) return res.status(400).send('failed');
		res.status(200).send({ConversationID: conversation._id});
	});
};

// ================================================================================
//  Function: getConversationWithId
//  REST: GET:/api/conversation/:id
//  Description: Return a list 15 most recent message by default, otherwise
//				 specified in req.header
//  Expected input (req.header): JSON:
//		start: int -- starting most of 15 most recent messages.
//		sender: the current User
//		
//			i.e req.header.start: 100 will return 101th to 115th most recent messages 
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

<<<<<<< HEAD
=======
	var limit = 15;
	if (req.headers) {
		limit = limit + parseInt(req.headers.start);
	}

	models.Message.find({"ConversationID": req.params.id})
	.sort({"_id": 1}).exec()

	.then(function (result) {
		return models.Conversation.findOne({"_id": req.params.id}).exec()
		.then(function (conversation) {
			var otherStudent = (req.headers.sender == conversation.StudentID[0]) 
				? conversation.StudentID[1] : conversation.StudentID[0];
			return models.Student.findOne({"_id": otherStudent});
		})
		.then(function (otherStudent) {
			var ress = result.slice(req.headers.start, limit);
			console.log(ress.length);
			res.status(200).send({
				"Sender": otherStudent._id,
				"SenderFirstName": otherStudent.FirstName,
				"SenderLastName": otherStudent.LastName,
				"Messages": result.slice(result.length - limit, result.length - limit + 15)
			});
		});
	});


	// .then(null, function() {
	// 	res.status(400).send("Something wrong");
	// });
>>>>>>> frontend
};

// ================================================================================
//  Function: putConversationWithId
//  REST: PUT:/api/conversation/:id
//  Description: Update the "seen" field of corresponding user of the conversation
//				with specified id
//  Expected input (req.body): JSON:
//			SeenPerson: id of the person who checked the conversation and saw
//				the message.
//				If SeenPerson = StudentID[0] => Clear Student1Seen
//				If SeenPerson = StudentID[1] => Clear Student2Seen
//  Expected output (res): JSON list:
//		[ {
//			Sender: String -- id of the sender,
//			SenderFirstName: String -- First name of the sender,
//		},
//			.......
//		]
//  Author: 
// ================================================================================
module.exports.putConversationWithId = function (req, res) {

	models.Conversation.findOne({"_id": req.params.id}).exec()

	.then(function (conversation) {
		if (req.body.SeenPerson == conversation.StudentID[0]) {
			return models.Conversation.update({"_id": conversation._id}, {
				"Student1Seen": 0
			});
		}
		else {
			return models.Conversation.update({"_id": conversation._id}, {
				"Student2Seen": 0
			});
		}
	})

	.then(function() {
		res.status(200).send("success");
	})

	.then(null, function() {
		res.status(400).send("fail");
	});

};


// ================================================================================
//  Function: messageReceived
//  REST: GET:/api/message/
//  Description:
//  Expected input (emit('personal message', data)): 
//			message.Content: String -- the message that is sent
//			data.ConversationID: String -- id of the CONVERSATION, not user
//			message.Sender: String -- id of Sender, which is a user
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.onPersonalMessageReceived = function (socket, io) {

	// Listen to personal message events to know which 
	// conversation id to listen to
	socket.on('personal message', function (data) {

		console.log("GOT CONVERSATION ID: " +data.ConversationID);
		console.log("LISTENING TO THE CONVERSATION");

		// Now, as we know the conversation id, create a dynamic
		// personal message + data.ConversationId to listen to a specific message
		// from a specific conversation.
		socket.on('personal message ' + data.ConversationID, function(message) {

			console.log("GOT MSG: " + message.Content);

			// Find the student so the other end knows the name of the sender
			models.Student.findOne({"_id": message.Sender}).exec()
			.then(function (student) {
				message["SenderName"] = student.FirstName;

				// Now, fire the message back to whoever is in that conversation.
				io.emit('personal message ' + data.ConversationID, message);

				// And, store the message to database
				return models.Message({
					ConversationID: data.ConversationID,
					Content: message.Content,
					Sender: message.Sender
				}).save();
			})

			.then(function() {
					return models.Conversation.findOne({"_id": data.ConversationID});
			})

			.then(function (conversation) {
				if (message.Sender == conversation.StudentID[0]) {
					return models.Conversation.update({"_id": conversation._id}, {
<<<<<<< HEAD
						Student1Seen : conversation.Student1Seen + 1,
=======
						"Student2Seen": conversation.Student1Seen + 1
>>>>>>> frontend
					});
				}
				else {
					return models.Conversation.update({"_id": conversation._id}, {
<<<<<<< HEAD
						Student2Seen : conversation.Student2Seen + 1,
=======
						"Student1Seen": conversation.Student2Seen + 1
>>>>>>> frontend
					});
				}
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
