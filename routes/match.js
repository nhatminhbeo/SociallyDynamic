// ===========================================================================
// File: /routes/match.js
// Description: Serve API functions to requests at route /api/match/*
// Author:
// Last updated: Feb 12 2017
// ===========================================================================

//    Path                    |   Method    |   Purpose / Brief Description
// ===============================================================================================================================================
//                                   Partner match (PM)
// ===============================================================================================================================================
//    /api/match/class/:id    |   GET       |   Get a list of potential partners for student described by id, priority class
//    /api/match/habit/:id    |   GET       |   Get a list of potential partners for student described by id, priority habit
//    /api/match/major/:id    |   GET       |   Get a list of potential partners for student described by id, priority major
// ===============================================================================================================================================

var api = require('../logic/match.js');
module.exports.route = function(app) {
	app.get('/api/match/class/:id', api.getMatchClassWithId);
	app.get('/api/match/habit/:id', api.getMatchHabitWithId);
	app.get('/api/match/major/:id', api.getMatchMajorWithId);
};