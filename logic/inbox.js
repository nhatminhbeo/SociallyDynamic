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
	var list = [];

	models.Conversation.find({"_id": req.params.id}).exec()
	.then(function (conversations) {

		// For each such class:
		return models.Promise.each(conversations, function(thisConversation) {
            var FriendStudentID = "";
			if (thisConversation.studentID[0] != req.params.id) {
				FriendStudentID = thisConversation.studentID[0];
			}
			else {
				FriendStudentID = thisConversation.studentID[1];
			}

			var a = models.Student.findOne({"_id": FriendStudentID});
			var b = models.GroupMessage.findOne({"_id": thisConversation._id});
			return models.Promise.join(a, b, function(student, message) {
				list.push({
					FirstName: student.FirstName,
					LastName: student.LastName,
					OtherID: student._id,
					Message: message.Content
				});
			});
		});
	})

	// succeed
	.then(function() {
		return res.status(200).json(list);
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
	var list = [];
   	models.FriendRequest.find({"Receiver" : req.params.id}).exec()
	.then(function (friendRequests) {
	    // For each such class:
		return models.Promise.each(friendRequests, function(friendRequest) {

			return models.Student.find({"_id" : friendRequest.Sender})
			.then(function(user) {
				list.push({
					FirstName: user.FirstName,
					LastName: user.LastName,
					OtherID: user._id,
					RequestID: friendRequest._id
				});
			});
		});
	})

	// succeed
	.then(function() {
		return res.status(200).json(list);
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

	var list = [];
	var groupName = "";
	var groupID = "";
	var gr;

	// Get all GroupRequest of user id
	models.GroupRequest.find({"Receiver": req.params.id}).exec()

	// For each such GroupRequest:
	.then(function (groupRequests) {

		return models.Promise.each(groupRequests, function (groupRequest) {

			var a = models.Group.findOne({"_id": groupRequest.GroupID});
			var b = models.Student.findOne({"_id": groupRequest.Sender});
	

			return models.Promise.join(a,b, function (group, student) {
				list.push({
					StudentID: student._id,
					FirstName: student.FirstName,
					LastName: student.LastName,
					GroupName: group.GroupName,
					GroupID: group._id
				});
			});
		});
	
	}).then(function() {
		return res.status(200).send(list);
	
	// Failed
	}).then(null, function() {
		res.status(400).send();
	});
};