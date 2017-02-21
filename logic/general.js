// ===========================================================================
// File: /logic/general.js
// Description: Export general purpose api functions
// Author:
// Last updated: Feb 12 2017
// ===========================================================================
module.exports.User = mongoose.model();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//for use in all friendship functions, friend.js
var friendshipSchema =  mongoose.schema({
	UserID = String[];
    StartDate = String;	
});

var Friendship = mongoose.model('Friendship', friendshipSchema);

//for use in the postFriendRequest and deleteFriendRequest, friend.js
var friendRequestSchema = new Schema({
	id: String,
	Sender: String,
	Receiver: String
});
var FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

//This seems like how you export multiple models 
module.exports = {
	Friendship: Friendship
	FriendRequest : FriendRequest
}
//you could also do it this way, which one is better tho? 
//exports.FriendRequest = FriendRequest;

