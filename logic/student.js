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

var models = require('./general');
var Student = models.Student;
var ClassStudent = models.ClassStudent;
var StudentStudyHabit = models.StudentStudyHabit;
var Class = models.Class;
var StudyHabit = models.StudyHabit;
var FriendRequest = models.FriendRequest;
var Friendship = models.Friendship;


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

	var ref = req.body;

	// Put necessary fields into a student model.
	var newStudent = models.Student({
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

		// For each class
		return models.Promise.each(ref.Class, function (Class) {

			// Save the classStudent relationship
			var classStudent = models.ClassStudent({
				StudentID: ref._id,
				Class: Class
			});
			return classStudent.save();
		});


	}).then(function () {

		// For each habit
		return models.Promise.each(ref.Habit, function(Habit) {
		
			// Save the student class relationship
			var studentStudyHabit = models.StudentStudyHabit({
				StudentID: ref._id,
				Habit: Habit
			});
			return studentStudyHabit.save();
		});

	// Return 200 if success
	}).then(function() {
		res.status(200).send();

	// Return 400 if fail anywhere
	}).then(null, function() {
		res.status(400).send();
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
console.log(ref.Class);
	// Update the student
	models.Student.update({"_id": req.params.id}, entries).exec()

	// Remove all ClassStudent
	.then(function () {
		return models.ClassStudent.remove({StudentID: req.params.id});
	})

	// Update new ClassStudent
	.then(function () {
		return models.Promise.each(ref.Class, function (Class) {
			// Save the classStudent relationship
			return models.ClassStudent({
				StudentID: req.params.id,
				Class: Class
			}).save();
		});

	// Remove all StudentStudyHabit
	}).then(function () {
		return models.StudentStudyHabit.remove({StudentID: req.params.id});

	// Update new StudentStudyHabit	
	}).then(function () {
		return models.Promise.each(ref.Habit, function (Habit) {
			// Save the StudentStudyHabit relationship
			return StudentStudyHabit({
				StudentID: req.params.id,
				Habit: Habit
			}).save();
		});
	
	// Return 200 if success
	}).then(function () {
		res.status(200).send();
	
	// Return 400 if failed
	}).then(null, function() {
		res.status(400).send();
	});
/*
	// Update Student schema
	Student.findByIdAndUpdate(req.params.id, entries, function (err, result) {
		if (err) {
			console.log('Could not find and update user with id ' + req.params.id);
			return res.status(400).send(err);
		}
	
		// Delete all student class relationships
		ClassStudent.remove({StudentID: req.params.id}, function (err) {
			if (err) {
				console.log('Could not remove student class relationship');
				return res.status(400).send(err);
			}

			// Find Classes & Add new student class relationships
			ref.Class.forEach(function (each) {
				Class.findOne({Name: each}, function (err, thisClass) {

					if (err) {
						console.log('Can not find class ' + each);
						return res.status(400).send(err);
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
							return res.status(400).send(err);
						}

						if (count1 === ref.Class.length - 1) {
							done1 = true;
							if (ref.Habit.length - count2 === 0) {
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
				return res.status(400).send(err);
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
							return res.status(400).send(err);
						}

						if (count2 === ref.Habit.length - 1) {
							done2 = true;
							if (ref.Class.length - count1 === 0) {
								return res.status(200).send();
							}
						}
						count2++;
					});
				});
			});
		});
		// Make sure to respond when Class is empty
		console.log(ref.Class.length + " " + ref.Habit.length);
		if (ref.Class.length === 0 && ref.Habit.length ===0 ) {
			return res.status(200).send();
		}
	});
*/
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

	var id = req.params.id;

	// Deleting all friendship request of student
	FriendRequest.remove({'$or': [{Sender: id}, {Receiver: id}]}).exec()

	// Deleting all friendships of student
	.then(function() {
		return Friendship.remove({UserID: id}).exec();
	})

	// Deleting all study habits of student
	.then(function() {
		return StudentStudyHabit.remove({StudentID: id}).exec();
	})

	// Deleting all classes of student
	.then(function() {
		return ClassStudent.remove({StudentID: id}).exec();
	})

/* FUTURE FUNCTIONALITIES
	// Removing student from all groups
	.then(function() {
		return StudentGroup.remove({StudentID: id}).exec();
	})

	// Removing all group request of the user
	.then(function() {
		return GroupRequest.remove({'$or': [{Sender: id}, {Receiver: id}]}).exec();
	})

	// Removing all group the user owns
	.then(function() {
		return Group.find({Owner: id}, '_id').exec();
	}).then(function(group) {
		return StudentGroup.remove({GroupID: group._id}), function (err){
			if (!err) {
				return GroupMessage.remove({GroupID: group._id}, function (err) {
					if (!err) return Group.remove({_id: group._id}).exec();
				});
			}
		});
	})

	// Remove all conversations of the user
	.then(function() {
		return Conversation.find({StudentID: id}, '_id').exec();
	}).then(function (conversation) {
		return Message.remove({ConversatoinID: conversatoin._id});
	}).then(function () {
		return Conversation.remove({StudentID: id}).exec();
	})
*/

	// Removing the actual the user
	.then(function () {
		return Student.remove({_id: id}).exec();
	})

	// Student removed successfully
	.then(function () {
		return res.status(200).send();
	})
/*
	// Failed to remove student
	.then(null, function() {
		res.status(400).send();
	});
*/
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
			Major: user.Major,
			Class: [],
			Habit: []
		};

		// Find all class and append to jsonStudent.Class
		models.ClassStudent.find({"StudentID": studentID}).exec()

		.then(function (found) {
			return models.Promise.each(found, function (entry) {
					jsonStudent.Class.push(String(entry.Class));
			});
		})

		// Find all habits and append to jsonStudent.Habit
		.then(function() {
			return models.StudentStudyHabit.find({"StudentID": studentID});	
		})

		.then(function (found) {
			return models.Promise.each(found, function (entry) {
				jsonStudent.Habit.push(String(entry.Habit));
			});
		})

		// Success
		.then(function () {

			res.status(200).json(jsonStudent);
		})

		// Fail
		.then(null, function () {
			res.status(400).send();
		});
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
	var list = [];

	models.Friendship.find({"UserID": req.params.id}).exec()
	.then(function(classes) {

		// For each such class:
		return models.Promise.each(classes, function(thisClass) {
			var FriendID = "";
			if (thisClass.UserID[0] != req.params.id) {
				FriendID = thisClass.UserID[0];
			} else {
				FriendID = thisClass.UserID[1];
			}

			return models.Student.findOne({"_id": FriendID}) 
			.then(function(user) {

				var jsonStudent = {
					_id: user._id,
					FirstName: user.FirstName,
					LastName: user.LastName,
					Age: user.Age,
					Bio: user.Bio,
					Email: user.Email,
					Major: user.Major
				}
				list.push(jsonStudent);
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