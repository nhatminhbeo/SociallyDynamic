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
}, {collection: 'Friendship'}));


// ===========================================================================
// FriendRequest Schema
// for use in the postFriendRequest and deleteFriendRequest, friend.js
// ===========================================================================
module.exports.FriendRequest = mongoose.model('FriendRequest', new Schema({
	Sender: String,
	Receiver: String
}, {collection: 'FriendRequest'}));


// ===========================================================================
// Student schema
// For use in USA, UPV, MUP
// ===========================================================================
module.exports.Student = mongoose.model('Student', new Schema({
	_id: String,
	Email: String,
	FirstName: String,
	LastName: String,
	Age: Number,
	Bio: String,
	Major: String,
}, {collection: 'Student'}));


// ===========================================================================
// Class schema
// ===========================================================================
module.exports.Class = mongoose.model('Class', new Schema({
	Name: String,
}, {collection: 'Class'}));


// ===========================================================================
// StudyHabit Schema
// ===========================================================================
module.exports.StudyHabit = mongoose.model('StudyHabit', new Schema({
	Habit: String,
}, {collection: 'StudyHabit'}));

// ===========================================================================
// StudentStudyHabit schema
// ===========================================================================
module.exports.StudentStudyHabit = mongoose.model('StudentStudyHabit', new Schema({
	Habit: String,
	StudentID: String,
}, {collection: 'StudentStudyHabit'}));

// ===========================================================================
// ClassStudent schema
// ===========================================================================
module.exports.ClassStudent = mongoose.model('ClassStudent', new Schema({
	Class: String,
	StudentID: String,
}, {collection: 'ClassStudent'}));
