app.controller('createGroupController', ['$scope', 'authService', '$location','$http', 'currentUser', function($scope, authService, $location,
$http, currentUser) {
    $scope.createGroupController = "createGroupController";
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }
}]);