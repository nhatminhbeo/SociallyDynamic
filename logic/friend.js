// ===========================================================================
// File: /logic/friend.js
// Description: Export API functions that handle requests at /api/friend/*
// Author:
// Last updated: Feb 12 2017
// ===========================================================================
//currently, general.js exports the FriendRequest model. 
var models = require('./general');
var mongoose = require('mongoose');

// ===============================================================================================================================================
//                                   Friendship (MF + UPV + PM)
// ===============================================================================================================================================
//    /api/friend/            |   GET       |   Get the friendship between two students described in request body
//    /api/friend/            |   POST      |   Create new friendship between two students described in request body
//    /api/friend/            |   DELETE    |   Delete a friendship between two students described in request body 
//    /api/friend/request     |   POST      |   Create new friend request from sender to receiver described in request body
//    /api/friend/request     |   DELETE    |   Delete a friend request from sender to receiver described in request body
// ===============================================================================================================================================


// ================================================================================
//  Function: getFriend
//  REST: GET:/api/friend
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Khiem Tran
// ================================================================================
exports.getFriend = function (req, res) {

};


// ================================================================================
//  Function: postFriend
//  REST: POST:/api/friend
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Khiem Tran
// ================================================================================
exports.postFriend = function (req, res) {

};

// ================================================================================
//  Function: deleteFriend
//  REST: DELETE:/api/friend
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Khiem Tran
// ================================================================================
exports.deleteFriend = function (req, res) {

};


// ================================================================================
//  Function: postFriendRequest
//  REST: POST:/api/friend/request
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Justin Huynh
// ================================================================================
exports.postFriendRequest = function (req, res) {
	var FriendRequest = models.FriendRequest;
	//this could break. 
	var friendRequest = new FriendRequest({
		id: req.body.id,
		Sender: req.body.Sender,
		Receiver: req.body.Receiver
	});

	friendRequest.save(function(err){
		if (err) throw err;
		//TODO is this how we are going to send success? What about error
		res.status(200).send('Saved friendRequest');
	});
};

// ================================================================================
//  Function: deleteFriendRequest
//  REST: DELETE:/api/friend/request
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
exports.deleteFriendRequest = function(req, res) {
	var FriendRequest = models.FriendRequest;
	var friendRequestId = req.body.id;
	// find the user with id 4
	FriendRequest.findByIdAndRemove(friendRequestId, function(err) {
	  if (err) throw err;

	  // we have deleted the user
	  res.status(200).send('Deleted friendRequest');
	});
};