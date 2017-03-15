// ===========================================================================
// File: /logic/match.js
// Description: Export API functions that handle requests at /api/match/*
// Author: Minh Tran Quoc
// Last updated: Mar 14 2017
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
//  Description: Get a list of potential partners for student described by
//				 id, priority class
//  Expected input (req.params.id): id of a student
//  Expected output (res): List of students with same major with _id, FirstName,
//							LastName, Match, [Classes], field.
//  Author: Minh Tran Quoc
// ================================================================================
module.exports.getMatchClassWithId = function (req, res) {

	var map = {};
	var list = [];

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

					return models.Student.findOne({"_id": id}).exec()

					.then(function (stu) {
						// Only count if other student is not the current student
						if ((id != req.params.id)) {
							if (map[id] != null) {
								map[id].Match = map[id].Match + 1;
								map[id].Classes.push(thisClass.Class);
							}
							else {
								map[id] = {
									_id: id,
									FirstName: stu.FirstName,
									LastName: stu.LastName,
									Match: 1,
									Classes: [thisClass.Class]
								};
							}
						}
					});
				});
			});
		});
	})

	// Flattern the json to array
	.then(function() {
		for (entry in map) {
			list.push(map[entry]);
		}
		list.sort(compare);
		return res.status(200).json(list);
	})

	// Failed
	.then(null, function() {
		res.status(400).send();
	});

};


// ================================================================================
//  Function: getMatchHabitWithId
//  REST: GET:/api/match/habit/:id
//  Description: Get a list of potential partners for student described
//				 by id, priority habit
//  Expected input (req.params.id): id of a student
//  Expected output (res): List of students with same major with _id, FirstName,
//							LastName, Match, [Habits], field.
//  Author: Minh Tran Quoc
// ================================================================================
module.exports.getMatchHabitWithId = function (req, res) {

	var map = {};
	var list = [];

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

					return models.Student.findOne({"_id": id}).exec()

					.then(function (stu) {

						// Only count if other student is not the current student
						if ((id != req.params.id)) {
							if (map[id] != null) {
								map[id].Match = map[id].Match + 1;
								map[id].Habits.push(habit.Habit);
							}
							else {
								map[id] = {
									_id: id,
									FirstName: stu.FirstName,
									LastName: stu.LastName,
									Match: 1,
									Habits: [habit.Habit]
								};
							}
						}
					});
				});
			});
		});
	})

	// Flattern the json to array
	.then(function() {
		for (entry in map) {
			list.push(map[entry]);
		}
		list.sort(compare);
		return res.status(200).json(list);
	})

	// Failed
	.then(null, function() {
		res.status(400).send();
	});

};


// ================================================================================
//  Function: getMatchMajorWithId
//  REST: GET:/api/match/major/:id
//  Description: Get a list of potential partners for student described
//				 by id, priority major
//  Expected input (req.params): id of a student
//  Expected output (res): list of students with same major with _id, FirstName,
//							LastName, Major field.
//  Author: Minh Tran Quoc
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
				if (otherStu._id != req.params.id) 
				{
					list.push({
						_id: otherStu._id,
						FirstName: otherStu.FirstName,
						LastName: otherStu.LastName,
						Major: otherStu.Major
					});
				}
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

// Compare function to compare matches of students
var compare =function (a, b) {
	if (a["Match"] > b["Match"]) {
		return -1;
	}
	else if (a["Match"] < b["Match"]) {
		return 1;
	}
	else {
		return 0;
	}
}