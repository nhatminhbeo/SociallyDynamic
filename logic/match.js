// ===========================================================================
// File: /logic/match.js
// Description: Export API functions that handle requests at /api/match/*
// Author:
// Last updated: Feb 12 2017
// ===========================================================================

var models = require('./general');

// ===============================================================================================================================================
//                                   Partner match (PM)
// ===============================================================================================================================================
//    /api/match/class/:id    |   GET       |   Get a list of potential partners for student described by id, priority class
//    /api/match/habit/:id    |   GET       |   Get a list of potential partners for student described by id, priority habit
//    /api/match/major/:id    |   GET       |   Get a list of potential partners for student described by id, priority major
// ===============================================================================================================================================


// ================================================================================
//  Function: getMatchClassWithId
//  REST: GET:/api/match/class/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.getMatchClassWithId = function (req, res) {

	var map = {};

	// Find list of class of student
	models.ClassStudent.find({StudentID: req.params.id}).exec()

	.then(function (classes) {

		// For each such class:
		return models.Promise.each(classes, function(thisClass) {

			// Find Class Students relationship that has the same class
			return models.ClassStudent.find({"Class": thisClass.Class})
			.then(function (otherStu) {

				// For each such relationship, increase the counter for the otherStu
				return models.Promise.each(otherStu, function (other) {
					id = other.StudentID;

					// Only count if other student is not the current student
					if ((id != req.params.id)) {
						if (map[id] != null) {
							map[id].Match = map[id].Match + 1;
							map[id].Classes.push(thisClass.Class);
						}
						else {
							map[id] = {
								Match: 1,
								Classes: [thisClass.Class]
							};
						}
					}
				});
			});
		})
	})

	// succeed
	.then(function() {
		return res.status(200).json(map);
	})

	// Failed
	.then(null, function() {
		res.status(400).send();
	});
};


// ================================================================================
//  Function: getMatchHabitWithId
//  REST: GET:/api/match/habit/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.getMatchHabitWithId = function (req, res) {

	var map = {};

	// Find list of class of student
	models.StudentStudyHabit.find({StudentID: req.params.id}).exec()

	.then(function (habits) {

		// For each such class:
		return models.Promise.each(habits, function(habit) {

			// Find Student Study Habit relationship that has the same habit
			return models.StudentStudyHabit.find({"Habit": habit.Habit})
			.then(function (otherStu) {

				// For each such relationship, increase the counter for the otherStu
				return models.Promise.each(otherStu, function (other) {
					id = other.StudentID;

					// Only count if other student is not the current student
					if ((id != req.params.id)) {
						if (map[id] != null) {
							map[id].Match = map[id].Match + 1;
							map[id].Habits.push(habit.Habit);
						}
						else {
							map[id] = {
								Match: 1,
								Habits: [habit.Habit]
							};
						}
					}
				});
			});
		})
	})

	// succeed
	.then(function() {
		return res.status(200).json(map);
	})

	// Failed
	.then(null, function() {
		res.status(400).send();
	});

};


// ================================================================================
//  Function: getMatchMajorWithId
//  REST: GET:/api/match/major/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.getMatchMajorWithId = function (req, res) {

	var list = [];

	// Find Student with Id
	models.Student.findOne({_id: req.params.id}).exec()

	.then(function (student) {

		// Find Student with same major
		return models.Student.find({"Major": student.Major}, "_id FirstName LastName Major")
		.then(function (otherStudents) {

			return models.Promise.each(otherStudents, function(otherStu) {
				// Add student with same major to the list
				list.push({
					_id: otherStu._id,
					FirstName: otherStu.FirstName,
					LastName: otherStu.LastName,
					Major: otherStu.Major
				});
			});
		});
	})

	// succeed
	.then(function() {
		return res.status(200).json(list);
	})

	// Failed
	.then(null, function() {
		res.status(400).send();
	});
};