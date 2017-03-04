app.controller('createGroupController', ['$scope', 'authService', '$location','$http', function($scope, authService, $location,
$http) {
    $scope.createGroupController = "createGroupController";
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }
}]);