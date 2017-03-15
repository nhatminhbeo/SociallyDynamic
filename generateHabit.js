// ===========================================================================
// File: generateHabit.js
// Description: Generate Habit based on data in data/ directory
// Author: Minh Tran Quoc
// Last updated: Mar 14 2017
// ===========================================================================

var models = require("./logic/general");
var fs = require("fs");
var obj = JSON.parse(fs.readFileSync("data/json/habits.json", 'utf8'));

models.Habit.remove().exec()
.then(function() {
	console.log("PROCESSING");
	return models.Promise.each(obj, function (Habit) {
		return models.Habit({
			Habit: Habit
		}).save();
	});
}).then(function() {
	return console.log("OK");
}).then(null, function() {
	return console.log("NOT OK");
});