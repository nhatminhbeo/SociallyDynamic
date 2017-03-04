// ===========================================================================
// File: /logic/data.js
// Description: Export API functions that handle requests at /api/data/*
// Author:
// Last updated: Feb 12 2017
// ===========================================================================

var models = require('./general');

// ===============================================================================================================================================
//    Path                    |   Method    |   Purpose / Brief Description
// ===============================================================================================================================================
//                                   Data (major, class, habits)
// ===============================================================================================================================================
//    /api/data/class         |   GET       |   Get list of classes
//    /api/data/major         |   GET       |   Get list of majors
//    /api/data/habit         |   GET       |   Get list of habits
// ===============================================================================================================================================

// ================================================================================
//  Function: getDataClass
//  REST: GET:/api/data/class
//  Description: Return list of all possible classes
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.getDataClass = function (req, res) {
	models.Class.find({}, function (err, found) {
		if (err) {
			return res.status(400).send();
		}
		else {
			return res.status(200).send(found);
		}
	});
};


// ================================================================================
//  Function: getDataMajor
//  REST: GET:/api/data/major
//  Description: Return list of all possible majors
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.getDataMajor = function (req, res) {

};


// ================================================================================
//  Function: getDataHabit
//  REST: GET:/api/data/habit
//  Description: Return list of all possible habits
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.getDataHabit = function (req, res) {

};