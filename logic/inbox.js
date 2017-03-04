// ===========================================================================
// File: /logic/inbox.js
// Description: Export API functions that handle requests at /api/inbox/*
// Author:
// Last updated: Feb 12 2017
// ===========================================================================

//                                   Inbox (IB)
// ===============================================================================================================================================
//    /api/inbox/message/:id  |   GET       |   Get list of message boxes of student described by id with other students or groups
//    /api/inbox/friend/:id   |   GET       |   Get list of friend request of student described by id from other students
//    /api/inbox/group/:id    |   GET       |   Get list of group invitation of student described by id from other students
// ===============================================================================================================================================

var models = require("./general");
// ================================================================================
//  Function: getInboxMessageWithId
//  REST: GET:/api/inbox/message/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.getInboxMessageWithId = function (req, res) {
	var jsonStudent = {};

	var toFind = {
    	UserID[0]: req.params.id
    };
    var toFindAlt = {
    	UserID[1]: req.params.id
    };

	models.Conversation.find({ '$and': [toFind, toFindAlt]}).exec()

	.then(function (classes) {

		// For each such class:
		return models.Promise.each(classes, function(thisClass) {


			if (thisClass.studentID[0] != req.params.id) {
				var FriendStudent = thisClass.studentID[0];
			}
			else {
				var FriendStudent = thisClass.studentID[1];
			}


			return models.Student.findOne({"Class": thisClass.Class})
			.then(function (user) {
				
				jsonStudent = {
			    otherID: FriendStudent,
				FirstName: user.FirstName,
				LastName: user.LastName,
				};
			});
		}
	}

	// succeed
	.then(function() {
		return res.status(200).json(jsonStudent);
	})

	// Failed
	.then(null, function() {
		res.status(400).send();
	});
};

// ================================================================================
//  Function: getInboxFriendWithId
//  REST: GET:/api/inbox/friend/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.getInboxFriendWithId = function (req, res) {
	var jsonStudent = {};

   	models.friendRequest.find({Receiver : req.params.id}).exec()
	.then(function (senders) {
	    // For each such class:
		return models.Promise.each(senders, function(sender) {

			return models.Student.find({_id : sender.Sender})
			.then(function(user) {
				jsonStudent = {
					RequestID: user.RequestID
					OtherID: user.StudentID,
					FirstName: user.FirstName,
					LastName: user.LastName,
				}
			}


			/*
			if (thisClass.studentID[0] != req.params.id) {
				var FriendStudent = thisClass.studentID[0];
			}
			else {
				var FriendStudent = thisClass.studentID[1];
			}*/
		}
	}

	// succeed
	.then(function() {
		return res.status(200).json(jsonStudent);
	})

	// Failed
	.then(null, function() {
		res.status(400).send();
	});

};


// ================================================================================
//  Function: getInboxGroupWithId
//  REST: GET:/api/inbox/group/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.getInboxGroupWithId = function (req, res) {

};