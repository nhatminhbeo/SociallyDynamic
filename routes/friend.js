// ===========================================================================
// File: /routes/friend.js
// Description: Serve API functions to requests at route /api/friend/*
// Author: Minh Tran Quoc
// Last updated: Feb 12 2017
// ===========================================================================

//    Path                    |   Method    |   Purpose / Brief Description
// ===============================================================================================================================================
//                                   Friendship (MF + UPV + PM)
// ===============================================================================================================================================
//    /api/friend/            |   GET       |   Get the friendship between two students described in request body
//    /api/friend/            |   POST      |   Create new friendship between two students described in request body
//    /api/friend/            |   DELETE    |   Delete a friendship between two students described in request body 
//    /api/friend/request     |   POST      |   Create new friend request from sender to receiver described in request body
//    /api/friend/request     |   DELETE    |   Delete a friend request from sender to receiver described in request body
// ===============================================================================================================================================

var api = require('../logic/friend.js');
module.exports.route = function(app) {
	app.get('/api/friend', api.getFriend);
	app.post('/api/friend', api.postFriend);
	app.delete('/api/friend', api.deleteFriend);
	app.post('/api/friend/request', api.postFriendRequest);
	app.delete('/api/friend/request', api.deleteFriendRequest);
};
// TODO