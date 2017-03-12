app.controller('groupController', ['$scope', 'authService', '$location', 'currentUser', '$http', '$rootScope', '$routeParams',
function($scope, authService, $location, 
currentUser, $http, $rootScope, $routeParams){

	$scope.isOwner;
	$scope.notOwner;


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

    // Delete the group as the owner
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

	// Render group page
	getGroupInfo();
}]);