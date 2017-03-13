app.controller('groupController', ['$scope', 'authService', '$location', 'currentUser', '$http', '$rootScope', '$routeParams',
function($scope, authService, $location, 
currentUser, $http, $rootScope, $routeParams){

	$scope.isOwner;
	$scope.notOwner;
	$scope.tempAddButton = true;
	$scope.add = false;
	$scope.selectedMembers = {};
	$scope.friendsFilter = "";

	 //logout
    $scope.logout = function() {
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }

// make sure to include this kind of thing later on to make sure 
// non-authenticated users don't have access to this 
/*if(!currentUser){
    $location.path('/');
    $rootScope.isNavbar = false;
}
if(currentUser){
    $rootScope.isNavbar = true;
}*/

	/* member stuff */
	$scope.members = [];
	$scope.memberMap = {};
	$scope.owner = "";
	$scope.groupname = "";
	$scope.memberID = "";

    // Retrives the entire list of group members
    var getGroupInfo = function(){

    	//check if user is an admin of group, to show delete button or not
    	$scope.isOwner = false;
    	$scope.notOwner = true;
        
        $http({
            method: 'GET',
            url: '/api/group/' + $routeParams.id
        }).then(function(data){
            console.log(data);
            // Get member list
            for (var i = 0; i < data.data.Member.length; i++){
                $scope.members.push(data.data.Member[i].FirstName + " " + data.data.Member[i].LastName);
                $scope.memberMap[data.data.Member[i].FirstName + " " + data.data.Member[i].LastName] = data.data.Member[i]._id;
            }

            console.log(data.data.GroupName);

            // Get group name
            $scope.groupname = data.data.GroupName;


            // Get owner of group
            return $scope.owner = data.data.Owner;

        })
        .then(function(data) {
        	//console.log($scope.owner);

        	// Check if user is the owner of group
			if ($scope.owner === currentUser.uid) {
				$scope.isOwner = true;
				$scope.notOwner = false;
			}
    	});
    }

    // Delete the group as the owner
	$scope.deleteGroup = function(){
	    $http({
	        method: 'DELETE',
	        url: '/api/group/' + $routeParams.id,
	    	headers: {
               'Content-type': 'application/json;charset=utf-8'
            }
	    }).then(function(data){
	        console.log("deleted group");
	        $location.path('/profile/' + currentUser.uid);
	    });
	}

    // Go to a group member's profile page
	$scope.profilePage = function(person){
		console.log($scope.memberMap);
		console.log(person);
		console.log($scope.memberMap[person]);
		var id = $scope.memberMap[person];
		$location.path('/profile/' + id)
	}


	// Leave group as a non-owner
	$scope.leaveGroup = function(){
		console.log("trying to leave group");
	    $http({
	        method: 'DELETE',
	        url: '/api/group/' + $routeParams.id + "/user",
	        headers: {
               'Content-type': 'application/json;charset=utf-8'
            },
            data : {
            	StudentID : currentUser.uid
            }
	    }).then(function(data){
	        console.log("left group");
	        $location.path('/profile/' + currentUser.uid);
	    });
	}
	
	// Go to group conversation
	$scope.goToGroupMessage = function(){
	    $location.path('/group/conversation/' + $routeParams.id);
	}



	// Add a new member into the already created group
	$scope.showMemberForm = function() {
		$scope.add = true;
		$scope.tempAddButton = false;
	}

    $http({
        method: "GET",
        url: "/api/student/friend/" + currentUser.uid
    }).then(function (data) {
        console.log(data);
        $scope.data = data.data;
        for (var i = 0; i < data.data.length; i++) {
            $scope.data[i]["Name"] = $scope.data[i]["FirstName"] + " " + $scope.data[i]["LastName"]
        }
        console.log(data);
    });

	// add member into temp selected member list
    $scope.listMembers = function(id, name) {
        console.log("id: " + id);
        console.log("name: " + name);

        if (!$scope.selectedMembers[id]) {
            console.log("No stuff");
            $scope.selectedMembers[id] = name;
        }
        
        console.log($scope.selectedMembers);
    }

   	// POST into the group
    $scope.addNewMember = function() {
		 //REST: POST:/api/group/:id/user
		console.log("trying to join group");
		var memberList = [];
        
        // get list if student IDs
        for (var key in $scope.selectedMembers) {
            console.log("key: " + key);
            memberList.push(key);
        }

		 $http({
		 	method: "POST",
			url: "/api/group/" + $routeParams.id + "/user",
		 	data : {
		 		StudentList : memberList
		 	}
		}).then(function(data){
	        console.log("joined group");
	        $scope.tempAddButton = true;
			$scope.add = false;
	        $location.path('/group/' + $routeParams.id);
	    });
	} 

	// delete selected members
    $scope.deleteMembers = function(id) {
        delete $scope.selectedMembers[id];
        console.log($scope.selectedMembers);
    }

    // cancel create group
    $scope.cancel = function() {
    	$scope.tempAddButton = true;
		$scope.add = false;
        $location.path('/group/' + $routeParams.id) ;
    }

	// Render group page
	getGroupInfo();
}]);