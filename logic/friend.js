// ===========================================================================
// File: /logic/friend.js
// Description: Export API functions that handle requests at /api/friend/*
// Author:
// Last updated: Feb 12 2017
// ===========================================================================
//currently, general.js exports the FriendRequest model. 
var models = require('./general');
var mongoose = require('mongoose');
var Friendship = models.Friendship;
var FriendRequest = models.FriendRequest;

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
//  Description: Returns the entry that was found
//  Expected input (req.headers): The id of the sender and receiver in body
//  Expected output (res): 200 for success and 400 for error
//  Author: Khiem Tran
// ================================================================================
module.exports.getFriend = function (req, res) {
    var toFind = {
    	UserID: req.headers.sender
    };
    var toFindAlt = {
    	UserID: req.headers.receiver
    };

	Friendship.findOne({ '$and': [toFind, toFindAlt]}, function (err, found) {
		if(err) 
			return res.status(400).send('Something broke');
		return res.status(200).send(found);
	});
};

// ================================================================================
//  Function: postFriend
//  REST: POST:/api/friend
//  Description: Returns a statement of completion	 
//  Expected input (req.body):The id of the sender and the receiver in the body
//  Expected output (res): 200 for success and 400 for error
//  Author: Khiem Tran
// ================================================================================
module.exports.postFriend = function (req, res) {
	var toPost = Friendship({
		UserID: [req.body.Sender, req.body.Receiver],
		StartDate: Date.now().toString()
	});

	toPost.save(function(err, entry) {
		if(err)
			return res.status(400).send('Something Broke');
		return res.status(200).send(entry);
	});
};

// ================================================================================
//  Function: deleteFriend
//  REST: DELETE:/api/friend
//  Description: Returns the entry deleted
//  Expected input (req.body): The id of the sender and the receiver in the body
//  Expected output (res): 200 for success and 400 for error
//  Author: Khiem Tran
// ================================================================================
module.exports.deleteFriend = function (req, res) {
    var toDel = {
    	UserID: req.body.Sender
    };
    var toDelAlt = {
    	UserID: req.body.Receiver
    }
    
    Friendship.findOneAndRemove({ '$and': [toDel, toDelAlt]}, function (err, found) {
	    if(err) 
			return res.status(400).send('Something broke');
		return res.status(200).send(found);
	}); 
};

// ================================================================================
//  Function: getFriendRequest
//  REST: GET:/api/friend/request
//  Description: The purpose of this method is to let the front end get all the friend
//		requests that are made from a certain receiver and sender. However I think 
//		that they will always put the current user as the receiver. Why? Because in 
//		the only time the front end will need this method is to display all friend 
//		requests towards the current user to display in their inbox, ie all the friend
// 		requests that our user is the recipient of. 
//		Another use of this function is to check if the current user is allowed to make
//			a friend request to another user. We know that the user will not be allowed
//			to do so if they have already made a request to that user. 
//		Front end will send in a specific friend relationship. 
//  Expected input (req.body):
//  Expected output (res):
//  Author: Justin Huynh
// ================================================================================
module.exports.getFriendRequest = function (req, res) {
	var FriendRequest = models.FriendRequest;
	var friendRequestSender = req.headers.sender; //auto converted to lowercase in
	var friendRequestReceiver = req.headers.receiver; //http headers by http 
	//console.log(req); for debugging: note above 2 comments ie 'Sender'->'sender'
	//https://github.com/mitre/HTTP-Proxy-Servlet/issues/65
	//here^^ is a link referring to this issue. pretty interesting~~
	FriendRequest.findOne(
		{ 
			Sender: friendRequestSender, 
			Receiver: friendRequestReceiver
		}, 
		function(err, data) {
			if (err) 
				return res.status(400).send(err);

			// we have found the request
			return res.status(200).send(data);
		}
	);
};


// ================================================================================
//  Function: postFriendRequest
//  REST: POST:/api/friend/request
//  Description: Add a new friend request using sender and receiver
//  Expected input (req.body):
//		req.body.Sender = Sender
//		req.body.Receiver = Receiver
//  Expected output (res): success(200) or error(400) code
//  Author: Justin Huynh
// ================================================================================
module.exports.postFriendRequest = function (req, res) {
	//this could break. 
	var friendRequest = new FriendRequest({
		Sender: req.body.Sender,
		Receiver: req.body.Receiver
	});

	friendRequest.save(function(err, data){
		if (err) 
			return res.status(400).send(err);

		return res.status(200).send(data);
	});
};

// ================================================================================
//  Function: deleteFriendRequest
//  REST: DELETE:/api/friend/request
//  Description: delete a friend request using sender and receiver
//  Expected input (req.body):
//		req.body.Sender = Sender
//		req.body.Receiver = Receiver
//  Expected output (res): 
//		success(200) or error(400) code
//		json object of deleted friend request, null if no request found/deleted
//  Author: Justin Huynh
// ================================================================================
module.exports.deleteFriendRequest = function(req, res) {
	var friendRequestSender = req.body.Sender;
	var friendRequestReceiver = req.body.Receiver;
	// find the user
	FriendRequest.findOneAndRemove(
		{ 
			Sender: friendRequestSender, 
			Receiver: friendRequestReceiver
		}, 
		function(err, data) {
			if (err) 
				return res.status(400).send(err);
			
			// we have deleted the user
			return res.status(200).send(data);
		}
	);
};