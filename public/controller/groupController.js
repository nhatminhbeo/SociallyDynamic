app.controller('groupController', ['$scope', 'authService', '$location', 'currentUser', '$http', '$rootScope', '$routeParams',
function($scope, authService, $location, 
currentUser, $http, $rootScope, $routeParams){

    //check if user is an admin of group, to show delete button or not
    $scope.isOwner = false;

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
	$scope.owner = "";

    // Retrives the entire list of group members
    var getGroupInfo = function(){
        $http({
            method: 'GET',
            url: '/api/group/' + $routeParams.id
        }).then(function(data){
            console.log(data);
            // Get member list
            for (var i = 0; i < data.data.Member.length; i++){
                $scope.members.push(data.data.Member[i].FirstName + " " + data.data.Member[i].LastName);
            }

            // Get owner of group
            return $scope.owner = data.data.Owner;
        })
        .then(function(data) {
        	console.log($scope.owner);

        	// Check if user is the owner of group
			if ($scope.owner === currentUser.uid) {
				$scope.isOwner = true;
			}
    	});
    }

	getGroupInfo();

	$scope.deleteGroup = function(){
		console.log("going to delete")
	    $http({
	        method: 'DELETE',
	        url: '/api/group/' + $routeParams.id
	    }).then(function(data){
	        console.log("deleted group");
	        $location.path('/profile/' + currentUser.uid);
	    });
	}

}]);