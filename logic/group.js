// ===========================================================================
// File: /logic/group.js
// Description: Export API functions that handle requests at /api/group/*
// Author:
// Last updated: Feb 12 2017
// ===========================================================================
var models = require('./general');
var Group = models.Group;
var StudentGroup = models.StudentGroup;
var GroupRequest = models.GroupRequest;
var Promise = models.Promise;

// ===============================================================================================================================================
//                                   Group (MSG)
// ===============================================================================================================================================
//    /api/group/             |   POST      |   Create a group with criteria(JSON) in request body
//    /api/group/:id          |   GET       |   Get information of a group defined by id
//    /api/group/:id          |   PUT       |   Change info of a group defined by id with new criteria(JSON) in request body
//    /api/group/:id          |   DELETE    |   Delete a group defined by id
//    /api/group/:id/user     |   POST      |   Add a student (described by request body) to group described by id
//    /api/group/:id/user     |   DELETE    |   Delete a student (described by request body) from group described by id
//    /api/group/request/:id  |   POST      |   Create a new invitation to group desribed by id from sender to receiver in body
//    /api/group/request/:id  |   DELETE    |   Delete an invitation to group desribed by id from sender to receiver in body
//    /api/group/user/:id     |   GET       |   Get list of groups of a student
// ===============================================================================================================================================

// ================================================================================
//  Function: postGroup
//  REST: POST:/api/group
//  Description: Create a new group entry and post it into the database
//  Expected input (req.body): Expects groupname and owner
//  Expected output (res): Sends back the json of the entry
//  Author: Khiem Tran
// ================================================================================
module.exports.postGroup = function (req, res) {
    var toPost = Group({
    	GroupName: req.body.name,
    	Owner: req.body.owner,
    });
    var id = '';

    toPost.save()
    .then(function() {
    	id = toPost._id;
        var sGroup = StudentGroup({
        	StudentID: req.body.owner,
        	GroupID: id,
        })
        return sGroup.save();
    })
    .then(function() {	
        return models.Promise.each(req.body.member, function(entry) {
        	console.log(id);
            var sGroup = StudentGroup({
            	StudentID: entry,
            	GroupID: id,
            });
            return sGroup.save();
        }) 	 
    })
    .then(function() {
    	return res.status(200).send(id);
    })/*
    .then(null, function() { 
        return res.status(400).send('Something broke');
    })*/
};

// ================================================================================
//  Function: getGroupWithId
//  REST: GET:/api/group/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Khiem Tran
// ================================================================================
module.exports.getGroupWithId = function (req, res) {
	Group.findById(function(err, entry) {

	})

};


// ================================================================================
//  Function: putGroupWithId
//  REST: PUT:/api/group/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Khiem Tran
// ================================================================================
module.exports.putGroupWithId = function (req, res) {

};


// ================================================================================
//  Function: deleteGroupWithId
//  REST: DELETE:/api/group/:id
//  Description:
//  Expected input (req.body):
//  Expected output (res):
//  Author: Khiem Tran
// ================================================================================
module.exports.deleteGroupWithId = function (req, res) {

};


// ================================================================================
//  Function: postGroupWithIdUser
//  REST: POST:/api/group/:id/user
//  Description: Add a student (described by request body) to group described by id
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.postGroupWithIdUser = function (req, res) {
	var studentGroup = new StudentGroup({
		GroupID: req.params.id,
		StudentID: req.body.id //TODO need to verify name of this field. studentID?
	});

	studentGroup.save(function(err){
		if (err) 
			return res.status(400).send(err);

		return res.status(200).send('Saved student in group(postGroupWithIdUser)');
	});
};


// ================================================================================
//  Function: deleteGroupWithIdUser
//  REST: DELETE:/api/group/:id/user
//  Description: Delete a student (described by request body) from group described by id
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.deleteGroupWithIdUser = function (req, res) {
	StudentGroup.findByIdAndRemove(req.params.id, function(err){
		if(err) 
			return res.status(400).send(err);

		return res.status(200).send('Deleted student in group(deleteGroupWithIdUser)');
	});
};

// ================================================================================
//  Function: postGroupWithIdUser
//  REST: POST:/api/group/user/:id
//  Description: Create a new invitation to group desribed by id from sender to receiver in body
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.postGroupWithIdRequest = function (req, res) {
	var groupRequest = new GroupRequest({
		//TODO verify if we need to do any manipulation to convert string to the type
		//in our schema "GroupID: Schema.Types.ObjectId,"
		GroupID: req.params.id, 
		Sender: req.body.Sender, 
		Receiver: req.body.Receiver
	});

	groupRequest.save(function(err){
		if (err) 
			return res.status(400).send(err);

		return res.status(200).send('Saved group request(postGroupWithIdRequest)');
	});
};


// ================================================================================
//  Function: deleteGroupWithIdRequest
//  REST: DELETE:/api/group/user/:id
//  Description: Delete an invitation to group desribed by id from sender to receiver in body
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.deleteGroupWithIdRequest = function (req, res) {
	GroupRequest.findByIdAndRemove(req.params.id, function(err){
		if(err)
			return res.status(400).send(err);

		return res.status(200).send('Deleted group request(deleteGroupWithIdRequest)');
	});
};

// ================================================================================
//  Function: getGroupUserWithId
//  REST: GET:/api/group/user/:id
//  Description: Return a list of users belonging to a group.
//  Expected input (req.params): id: id of a group
//  Expected output (res):
//  Author: Minh Tran Quoc
// ================================================================================
module.exports.getGroupUserWithId = function (req, res) {

	var list = [];

	// Check if student exist:
	models.Student.findOne({"_id": req.params.id}).exec()

	// Find all studentGroup objects
	.then(function (found) {
		return models.StudentGroup.find({StudentID: req.params.id});
	})

	.then(function (groups) {

		// Iterate through list of students found
		Promise.each(groups, function (group) {

			// For each such student
			return models.Group.findOne({"_id": group.GroupID})
			.then(function (found) {
				list.push(found);
			});
		})

		// Return if true
		.then(function() {
			return res.status(200).json(list);
		})

		// Failed to find groups
		.then(null, function() {
			return res.status(400).send();
		});

	})

	// Failed to find student
	.then(null, function() {
		return res.status(400).send();
	});
};