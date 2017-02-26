// ===========================================================================
// File: /logic/student.js
// Description: Export API functions that handle requests at /api/student/*
// Author:
// Last updated: Feb 12 2017
// ===========================================================================

// ===============================================================================================================================================
//    Path                    |   Method    |   Purpose / Brief Description
// ===============================================================================================================================================
//                                   Student (USA + UPV + MS + MUP)
// ===============================================================================================================================================
//    /api/student/           |   POST      |   Create a student with criteria(JSON) in request body
//    /api/student/:id        |   PUT       |   Modify a student defined by id with new criteria(JSON) in request body
//    /api/student/:id        |   DELETE    |   Delete a student defined by id
//    /api/student/:id        |   GET       |   Get profile of a student as JSON object
//    /api/student/friend/:id |   GET       |   Get a list of friends (name, profile pic, id) of user defined by id
// ===============================================================================================================================================

var general = require('./general');
var Student = general.Student;
var ClassStudent = general.ClassStudent;
var StudentStudyHabit = general.StudentStudyHabit;
var Class = general.Class;
var StudyHabit = general.StudyHabit;


// ================================================================================
//  Function: postStudent
//  REST: POST:/api/student/
//  Description:
//  Expected input (req.body):
//  		- _id : id String auto generated by firebase 
//          - Email : String
//          - FirstName : String
//			- LastName : String
//			- Age : int
//			- Bio : String
//			- Email : String
//			- Major : String
//			- Class : [String]
// 			- Habit : [String]
//  Expected output (res):
//          - respond code: 200 for created (success), user added to database
//							400 for failed
//  Author: Minh Tran Quoc
// ================================================================================
module.exports.postStudent = function (req, res) {

	var done1 = false;
	var done2 = false;
	var count1 = 0;
	var count2 = 0;

	var ref = req.body;

	// Put necessary fields into a student model.
	var newStudent = Student({
		_id: ref._id,
		Email: ref.Email,
		FirstName: ref.FirstName,
		LastName: ref.LastName,
		Age: ref.Age,
		Bio: ref.Bio,
		Major: ref.Major
	});

	// Create it in database
	newStudent.save(function(err) {

		// Couldn't create student
		if (err) {
			console.log('Can not create new student in mongodb');
			return res.status(400).send();
		}
		else {
			// Student created, making studentclass relationships
			ref.Class.forEach(function (each) {
				// Find to see if the class is a valid class in database
				Class.findOne({"Name": each}, function(err, thisClass) {
					console.log(thisClass);

					// Not a valid class
					if (err) {
						console.log('Can not find class ' + each);
						return res.status(400).send();
					}
					else {
						// Valid student, create ClassStudent relationship
						var classStudent = ClassStudent({
							StudentID: ref._id,
							Class: thisClass.Name
						});

						classStudent.save(function(err) {
							if (err) {
								console.log('Can not create new ClassStudent in mongodb');
								console.log(err);
								return res.status(400).send();
							}

							if (count1 === ref.Class.length - 1) {
								done1 = true;
								if (done2) {
									return res.status(200).send();
								}
							}

							count1++;
							console.log('count1: ' + count1 + done1);
						});
					}
				});
			});

			// Create student habit relationships for each habit
			ref.Habit.forEach(function (each) {
				// Find if the class is valid
				StudyHabit.findOne({"Habit": each}, function(err, habit) {

					// Class not valid
					if (err) {
						console.log('Can not find study habit ' + each);
						return res.status(400).send();
					}

					// Found study habit, making StudentStudyHabit relationship
					var studentStudyHabit = StudentStudyHabit({
						StudentID: ref._id,
						Habit: each
					});

					// Put it in database
					studentStudyHabit.save(function(err) {
						// Couldn't create ?
						if (err) {
							console.log('Can not create new studentStudyHabit in mongodb');
							return res.status(400).send();
						}
						else {
							if (count2 === ref.Habit.length - 1) {
								done2 = true;
								if (done1) {
									return res.status(200).send();
								}
							}
						}
						count2++;
						console.log('count2: ' + count2 + done2);
					});
				});
			});
		}
	});
};


// ================================================================================
//  Function: putStudentWithId
//  REST: PUT:/api/student/:id
//  Description: Change the information of an existing user
//  Expected input
//			(req.params.id): the id of user being changed
//			(req.body): new information in JSON format, including: 
//        		- Email : String
//        		- FirstName : String
//				- LastName : String
//				- Age : int
//				- Bio : String
//				- Email : String
//				- Major : String
//				- Class : String array
// 				- Habit : String array
//  Expected output (res):
//          - respond code: 200 for created (success), user modified in database
//							400 for failed
//  Author: Minh Tran Quoc
// ================================================================================
module.exports.putStudentWithId = function (req, res) {

	// handle async
	var done1 = false;
	var done2 = false;
	var count1 = 0;
	var count2 = 0;

	var ref = req.body;
	var entries = {
		Email: ref.Email,
		FirstName: ref.FirstName,
		LastName: ref.LastName,
		Age: ref.Age,
		Bio: ref.Bio,
		Major: ref.Major
	}

	// Update Student schema
	Student.findByIdAndUpdate(req.params.id, entries, function (err, result) {
		if (err) {
			console.log('Could not find and update user with id ' + req.params.id);
			return res.status(400).send();
		}
	
		// Delete all student class relationships
		ClassStudent.remove({StudentID: req.params.id}, function (err) {
			if (err) {
				console.log('Could not remove student class relationship');
				return res.status(400).send();
			}

			// Find Classes & Add new student class relationships
			ref.Class.forEach(function (each) {
				Class.findOne({Name: each}, function (err, thisClass) {

					if (err) {
						console.log('Can not find class ' + each);
						return res.status(400).send();
					}

					// Valid student, create ClassStudent relationship
					var classStudent = ClassStudent({
						StudentID: req.params.id,
						Class: thisClass.Name
					});

					// Save new ClassStudent relationship
					classStudent.save(function(err) {
						if (err) {
							console.log('Can not create new ClassStudent in mongodb');
							console.log(err);
							return res.status(400).send();
						}

						if (count1 === ref.Class.length - 1) {
							done1 = true;
							if (done2) {
								return res.status(200).send();
							}
						}
						count1++;
					});
				});			
			});
		});

		//Delete all SudentStudyHabit
		StudentStudyHabit.remove({StudentID: req.params.id}, function (err) {
			if (err) {
				console.log('Could not remove all StudentStudyHabit');
				return res.status(400).send();
			}

			// Add new study habits relations
			ref.Habit.forEach(function (each) {
				//Verify whether valid study habit
				StudyHabit.findOne({Habit: each}, function (err, thisHabit) {
					if (err) {
						console.log('Could not find habit' + each);
						return res.status(400).send();
					}

					// valid habit, create StudentStudyHabit relationship
					var studentStudyHabit = StudentStudyHabit({
						StudentID: req.params.id,
						Habit: thisHabit.Habit
					});

					// save the new student study habit relationship
					studentStudyHabit.save(function(err) {
						if (err) {
							console.log('Could not create new StudentStudyHabit relationship');
							return res.status(400).send();
						}

						if (count2 === ref.Habit.length - 1) {
							done2 = true;
							if (done1) {
								return res.status(200).send();
							}
						}
						count2++;
					});
				});
			});
		});
	});
};


// ================================================================================
//  Function: deleteStudentWithId
//  REST: DELETE:/api/student/:id
//  Description: delete profile of an user
//  Expected input (req.params.id): id of the user being deleted
//  Expected output (res):
//          - respond code: 200 for created (success), user data emptied, but not deleted
//							400 for failed
//  Author: Minh Tran Quoc
// ================================================================================
module.exports.deleteStudentWithId = function (req, res) {
};


// ================================================================================
//  Function: getStudentWithId
//  REST: GET:/api/student/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Ruohan Hu
// ================================================================================
module.exports.getStudentWithId = function (req, res) {
	var studentID = req.params.id;
	
	// get a user with the ID
	Student.findById(studentID, function(err, user) {
		if (err) res.status(400).send(err);
		// show the user
		var jsonStudent = {
			_id: user._id,
			FirstName: user.FirstName,
			LastName: user.LastName,
			Age: user.Age,
			Bio: user.Bio,
			Email: user.Email,
			Major: user.Major
		};
		res.status(200).json(jsonStudent);
	});
};


// ================================================================================
//  Function: getStudentFriendWithId
//  REST: GET:/api/student/friend/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Ruohan Hu
// ================================================================================
module.exports.getStudentFriendWithId = function (req, res) {
	var stduentFriendID = req.params.id;

	// get a user with the ID
	Student.findById(studentFriendID, function(err, user) {
		if (err) res.status(400).send(err);
		// show the user
		var jsonStudentFriend = {
			_id: user._id,
			FirstName: user.FirstName,
			LastName: user.LastName,
			Age: user.Age,
			Bio: user.Bio,
			Email: user.Email,
			Major: user.Major
		};
		res.status(200).json(jsonStudentFriend);
	});
};