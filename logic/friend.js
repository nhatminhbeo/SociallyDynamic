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
//  Expected input (req.body): The id of the sender and receiver in body
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
		UserID: [req.body.sender, req.body.receiver],
		StartDate: Date.now().toString()
	});

	toPost.save(function(err) {
		if(err)
			return res.status(400).send('Something Broke');
		return res.status(200).send('Friendship Posted');
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
    	UserID: req.body.sender
    };
    var toDelAlt = {
    	UserID: req.body.receiver
    }
    
    Friendship.findOneAndRemove({ '$and': [toDel, toDelAlt]}, function (err, found) {
	    if(err) 
			return res.status(400).send('Something broke');
		return res.status(200).send(found);
	}); 
};


// ================================================================================
//  Function: postFriendRequest
//  REST: POST:/api/friend/request
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Justin Huynh
// ================================================================================
module.exports.postFriendRequest = function (req, res) {
	var FriendRequest = models.FriendRequest;
	//this could break. 
	var friendRequest = new FriendRequest({
		Sender: req.body.Sender,
		Receiver: req.body.Receiver
	});

	friendRequest.save(function(err){
		if (err) 
			res.status(400).send(err);

		res.status(200).send('Saved friendRequest');
	});
};

// ================================================================================
//  Function: deleteFriendRequest
//  REST: DELETE:/api/friend/request
//  Description: delete a friend request using sender and receiver
//  Expected input (req.body):
//		req.body.id = _id
//		req.body.Sender = Sender
//		req.body.Receiver = Receiver
//  Expected output (res): success(200) or error(400) code
//  Author: Justin Huynh
// ================================================================================
module.exports.deleteFriendRequest = function(req, res) {
	var FriendRequest = models.FriendRequest;
	var friendRequestSender = req.body.Sender;
	var friendRequestReceiver = req.body.Receiver;
	// find the user with id 4
	FriendRequest.findOneAndRemove(
		{ 
			Sender: friendRequestSender, 
			Receiver: friendRequestReceiver
		}, 
		function(err) {
			if (err) 
				res.status(400).send(err);
			
			// we have deleted the user
			res.status(200).send('Deleted friendRequest');	
		}
	);
};