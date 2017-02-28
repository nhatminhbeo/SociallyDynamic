app.controller('conversationController', ['$scope', 'authService', '$location', function($scope, authService, $location) {
    $scope.conversationController = "conversationController";
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }
}]);