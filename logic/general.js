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
	UserID = Array;
    StartDate = String;	
});

var Friendship = mongoose.model('Friendship', friendshipSchema);

//for use in the postFriendRequest and deleteFriendRequest, friend.js
var friendRequestSchema = new Schema({
	Sender: ObjectId,
	Receiver: ObjectId
});
var FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

var Student = mongoogle.schema({
	_id: ObjectId,
	Email: String,
	FirstName: String,
	LastName: String,
	Age: Number,
	Bio: String,
	Major: String,
})

var StudentStudyHabit = mongoose.schema({
	Habit: String,
	StudentID: ObjectId
})

var ClassStudent = mongoose.schema({
	ClassID: ObjectId,
	StudentID: ObjectId,
})

//This seems like how you export multiple models 
module.exports = {
	Friendship: Friendship
	FriendRequest : FriendRequest
}
//you could also do it this way, which one is better tho? 
//exports.FriendRequest = FriendRequest;

