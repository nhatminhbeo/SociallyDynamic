app.controller('groupController', ['$scope', 'authService', '$location', 'currentUser', '$http', '$rootScope', '$routeParams',
function($scope, authService, $location, 
currentUser, $http, $rootScope, $routeParams){

    // check if user has groups created already to view
    $scope.groupsExist = true;
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

    // Retrives the entire list of group members
    var getMembers = function(){
        $http({
            method: 'GET',
            url: '/api/group/' + $routeParams.id
        }).then(function(data){
            for (var i = 0; i < data.data.Member.length; i++){
                $scope.members.push(data.data.Member[i].FirstName + " " + data.data.Member[i].LastName);
            }
            
        });
        console.log($scope.Members);
    }



$scope.groupController = "Hello from group controller";
console.log(currentUser);
getMembers();
}]);