app.controller('conversationController', ['$scope', 'authService', '$location','$http', function($scope, authService, $location,
 $http) {
    $scope.conversationController = "conversationController";
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }
}]);