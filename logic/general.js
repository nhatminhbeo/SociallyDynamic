// ===========================================================================
// File: /logic/general.js
// Description: Export general purpose api functions
// Author:
// Last updated: Feb 12 2017
// ===========================================================================

// Initialize Mongodb + Mongoose
var mongoose = require('mongoose');
var dev_uri = "mongodb://SociallyDynamic:SociallyDynamic@ds153179.mlab.com:53179/sociallydynamic";
mongoose.connect(dev_uri);
Promise = require('bluebird');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

module.exports.Schema = Schema;
module.exports.Promise = Promise;

// ===========================================================================
// Friendship Schema
// for use in all friendship functions, friend.js
// ===========================================================================
module.exports.Friendship = mongoose.model('Friendship', new Schema({
	UserID: [String],
    StartDate: String,	
}, {collection: 'Friendship'}));


// ===========================================================================
// FriendRequest Schema
// for use in the postFriendRequest and deleteFriendRequest, friend.js
// ===========================================================================
module.exports.FriendRequest = mongoose.model('FriendRequest', new Schema({
	Sender: String,
	Receiver: String,
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


// ===========================================================================
// Group schema
// ===========================================================================
module.exports.Group = mongoose.model('Group', new Schema({
	GroupName: String,
	Owner: String,
}, {collection: 'Group'}));

// ===========================================================================
// StudentGroup schema
// ===========================================================================
module.exports.StudentGroup = mongoose.model('StudentGroup', new Schema({
	GroupID: String,
	StudentID: String,
}, {collection: 'StudentGroup'}));


// ===========================================================================
// GroupRequest schema
// ===========================================================================
module.exports.GroupRequest = mongoose.model('GroupRequest', new Schema({
	GroupID: String,
	Sender: String,
	Receiver: String
}, {collection: 'GroupRequest'}));

// ===========================================================================
// GroupMessage schema
// ===========================================================================
module.exports.GroupMessage = mongoose.model('GroupMessage', new Schema({
	GroupID: String,
	Sender: String,
	Content: String,
	Chronology: Number
}, {collection: 'GroupMessage'}));


// ===========================================================================
// Conversation schema
// ===========================================================================
module.exports.Conversation = mongoose.model('Conversation', new Schema({
	StudentID: [String],
	Student1Seen: Number,
	Student2Seen: Number,
	CurrentChronology: Number,
}, {collection: 'Conversation'}));


// ===========================================================================
// Message schema
// ===========================================================================
module.exports.Message = mongoose.model('Message', new Schema({
	ConversationID: String,
	Sender: String,
	Content: String,
	Chronology: Number
}, {collection: 'Message'}));


// ===========================================================================
// Major schema
// ===========================================================================
module.exports.Major = mongoose.model('Major', new Schema({
	MajorName: String
}, {collection: 'Major'}));


// ===========================================================================
// Habit schema
// ===========================================================================
module.exports.Habit = mongoose.model('Habit', new Schema({
	Habit: String
}, {collection: 'Habit'}));