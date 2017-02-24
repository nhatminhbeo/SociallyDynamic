// ===========================================================================
// File: /logic/general.js
// Description: Export general purpose api functions
// Author:
// Last updated: Feb 12 2017
// ===========================================================================

// Initialize Mongodb + Mongoose
var mongoose = require('mongoose')
mongoose.createConnection('mongodb://localhost:27017/sociallydynamic');
var Schema = mongoose.Schema;

// ===========================================================================
// Friendship Schema
// for use in all friendship functions, friend.js
// ===========================================================================
module.exports.Friendship = mongoose.model('Friendship', new Schema({
	UserID: [String],
    StartDate: String	
}));


// ===========================================================================
// FriendRequest Schema
// for use in the postFriendRequest and deleteFriendRequest, friend.js
// ===========================================================================
module.exports.FriendRequest = mongoose.model('FriendRequest', new Schema({
	Sender: String,
	Receiver: String
}));


// ===========================================================================
// Student schema
// For use in USA, UPV, MUP
// ===========================================================================
module.exports.Student = mongoose.model('Student', new Schema({
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
module.exports.StudentStudyHabit = mongoose.model('StudentStudyHabit', new Schema({
	Habit: String,
	StudentID: Schema.Types.ObjectId
}));

// ===========================================================================
// ClassStudent schema
// ===========================================================================
module.exports.ClassStudent = mongoose.model('ClassStudent', new Schema({
	ClassID: Schema.Types.ObjectId,
	StudentID: Schema.Types.ObjectId,
}));
