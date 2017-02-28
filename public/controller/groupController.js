app.controller('groupController', ['$scope', 'authService', '$location','$http', function($scope, authService, $location,
$http) {
    $scope.groupController = "groupController";
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }
}]);