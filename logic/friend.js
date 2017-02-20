// ===========================================================================
// File: /logic/friend.js
// Description: Export API functions that handle requests at /api/friend/*
// Author:
// Last updated: Feb 12 2017
// ===========================================================================


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
	var Schema = mongoose.Schema;
	var friendRequestSchema = new Schema({
		id: String,
		Sender: String,
		Receiver: String
	});
	var FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

	//this could break. 
	var friendRequest = new FriendRequest({
		id: req.body.id,
		Sender: req.body.Sender,
		Receiver: req.body.Receiver
	});

	friendRequest.save(function(err){
		if (err) throw err;

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
	// find the user with id 4
	User.findByIdAndRemove(4, function(err) {
	  if (err) throw err;

	  // we have deleted the user
	  console.log('User deleted!');
	});
};