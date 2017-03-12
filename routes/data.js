// ===========================================================================
// File: /routes/data.js
// Description: Serve API functions to requests at route /api/data/*
// Author: Minh Tran Quoc
// Last updated: Feb 12 2017
// ===========================================================================

//    Path                    |   Method    |   Purpose / Brief Description
// ===============================================================================================================================================
//                                   Data (major, class)
// ===============================================================================================================================================
//    /api/data/class         |   GET       |   Get list of classes
//    /api/data/major         |   GET       |   Get list of majors
//    /api/data/habit         |   GET       |   Get list of habits
// ===============================================================================================================================================

var api = require('../logic/data');
module.exports.route = function(app) {
	app.get('/api/data/class', api.getDataClass);
	app.get('/api/data/habit', api.getDataHabit);
	app.get('/api/data/major', api.getDataMajor);
};