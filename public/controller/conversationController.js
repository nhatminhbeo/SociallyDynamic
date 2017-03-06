app.controller('conversationController', ['$scope', 'authService', '$location','$http', 'currentUser', function($scope, authService, $location,
 $http, currentUser) {
    $scope.conversationController = "conversationController";
    $scope.message="";
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
}]);