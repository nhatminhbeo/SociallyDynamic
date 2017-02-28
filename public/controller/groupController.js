app.controller('groupController', ['$scope', 'authService', '$location', function($scope, authService, $location) {
    $scope.groupController = "groupController";
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }
}]);