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
var GroupMessage = models.GroupMessage;
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
    console.log(req.body);
    var memberList = req.body.member;
    memberList.push(req.body.owner);

    toPost.save()
    .then(function() {	
        return models.Promise.each(memberList, function(entry) {
            var sGroup = StudentGroup({
            	StudentID: entry,
            	GroupID: toPost._id,
            });
            return sGroup.save();
        }) 	 
    })
    .then(function() {
    	return res.status(200).send(toPost._id);
    })
    .then(null, function() { 
        return res.status(400).send('Something broke');
    })
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
	

	var list = [];
	var studentList = [];
	var group;
   
	Group.findById(req.params.id)
	.then(function(entry) {
		group = entry;
        sGroup = {
        	GroupID: entry.id,
        };
        return StudentGroup.find(sGroup)
    })
    .then(function(entry) {
    	return models.Promise.each(entry, function(stu) {
            return models.Student.findById(stu.StudentID).then(function (student) {
            	stuJson = {
					_id: student._id,
					FirstName: student.FirstName,
			    	LastName: student.LastName,
	   			}
	            studentList.push(stuJson);
            });
    	});
    })
    .then(function() {
    	sendback = {
    		Owner: group.Owner,
    		Member: studentList,
    	}
    	return res.status(200).send(sendback);
    })
    .then(null, function() {
        return res.status(400).send('Something Broke');
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
	if(req.body.name && req.body.owner) {
	    var update = {
		    GroupName: req.body.name,
		    Owner: req.body.owner,
	    }
	}
	else if(req.body.name) {
		var update = {
			GroupName: req.body.name,
		}
	}
	else {
		var update = {
			Owner: req.body.owner,
		}
	}

    Group.findByIdAndUpdate(req.params.id, update, function(err) {
    	if(err)
    		res.status(400).send('Something Broke');
    	return res.status(200).send();
    })
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
	var sGroup = {
		GroupID: req.params.id,
	}
	var gMess = {
		GroupID: req.params.id,
	}
	var gReq = {
		GroupID: req.params.id,
	}

    Group.findByIdAndRemove(req.params.id).then(function () {
    	return StudentGroup.remove(sGroup);
    })
    .then(function () {
    	return GroupMessage.remove(gMess);
    })
    .then(function () {
    	return GroupRequest.remove(gReq);
    })
    .then(function () {
    	res.status(200).send();
    });
    // .then(null, function () {
    // 	res.status(400).send();
    // });

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
		StudentID: req.body.StudentID //TODO need to verify name of this field. studentID?
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
	StudentGroup.findOneAndRemove(
		{
			GroupID: req.params.id,
			StudentID: req.body.StudentID
		}, 
		function(err){
			if(err) 
				return res.status(400).send(err);

			return res.status(200).send('Deleted student in group(deleteGroupWithIdUser)');
	});
};

// ================================================================================
//  Function: postGroupWithIdUser
//  REST: POST:/api/group/:id/request
//  Description: Create a new invitation to group desribed by id from sender to receiver in body
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.postGroupWithIdRequest = function (req, res) {
	var groupRequest = new GroupRequest({
		//TODO verify if we need to do any manipulation to convert string to the type
		//in our schema "GroupID: Schema.Types.ObjectId,"
		GroupID: models.Schema.Types.ObjectId(req.params.id),
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
//  REST: DELETE:/api/group/:id/request
//  Description: Delete an invitation to group desribed by id from sender to receiver in body
//  Expected input (req.body):
//  Expected output (res):
//  Author: 
// ================================================================================
module.exports.deleteGroupWithIdRequest = function (req, res) {
	GroupRequest.findOneAndRemove(
		{
			GroupID: models.Schema.Types.ObjectId(req.params.id),
			Sender: req.body.Sender,
			Receiver: req.body.Receiver
		}, 
		function(err){
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