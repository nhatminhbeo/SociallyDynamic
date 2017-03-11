app.controller('conversationController', ['$scope', 'authService', '$location','$http', 'currentUser', function($scope, authService, $location,
 $http, currentUser) {
    $scope.conversationController = "conversationController";
    $scope.message="";
    $scope.messages = [];
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
}

     $scope.sendMessage = function() {
     	$scope.message = "";
     // Modify User Class List
     if (true) {
        console.log("sendMessage() called")
     }
    }    
console.log($scope.messages);

    //take user inputted message and display on chat screen
    $scope.userSendMessage = function(){
    	$scope.message = $scope.message.trim();
    	if($scope.message=="") {
    		return;
    	}
    	$scope.messages.push($scope.message);
    	$scope.message = "";
    }i




}]);