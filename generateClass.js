// ===========================================================================
// File: generateClass.js
// Description: Generate Class based on data in data/ directory
// Author: Minh Tran Quoc
// Last updated: Mar 14 2017
// ===========================================================================

var models = require("./logic/general");
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('data/json/classes.json', 'utf8'));

models.Class.remove().exec()
.then(function() {
	console.log("PROCESSING");
	return models.Promise.each(obj, function (Class) {
		return models.Class({
			Name: Class.code.toUpperCase()
		}).save();
	});
}).then(function() {
	return console.log("OK");
}).then(null, function() {
	return console.log("NOT OK");
});