// ===========================================================================
// File: /logic/general.js
// Description: Export general purpose api functions
// Author:
// Last updated: Feb 12 2017
// ===========================================================================


// Initialize Mongodb + Mongoose
var mongoose = require('mongoose').connect('mongodb://localhost:27017/sociallydynamic');
var Schema = mongoose.Schema;

// ===========================================================================
// Friendship Schema
// for use in all friendship functions, friend.js
// ===========================================================================
exports.Friendship = mongoose.model('Friendship', new Schema({
	UserID = Array;
    StartDate = String;	
}));


// ===========================================================================
// FriendRequest Schema
// for use in the postFriendRequest and deleteFriendRequest, friend.js
// ===========================================================================
exports.FriendRequest = mongoose.model('FriendRequest', new Schema({
	Sender: String,
	Receiver: String
}));


// ===========================================================================
// Student schema
// For use in USA, UPV, MUP
// ===========================================================================
exports.Student = mongoose.model('Student', new Schema({
	_id: ObjectId,
	Email: String,
	FirstName: String,
	LastName: String,
	Age: Number,
	Bio: String,
	Major: String,
}));

// ===========================================================================
// StudentStudyHabit schema
// ===========================================================================
exports.StudentStudyHabit = mongoose.model('StudentStudyHabit', new Schema({
	Habit: String,
	StudentID: ObjectId
}));

// ===========================================================================
// ClassStudent schema
// ===========================================================================
exports.ClassStudent = mongoose.model('ClassStudent', Schema({
	ClassID: ObjectId,
	StudentID: ObjectId,
}));
