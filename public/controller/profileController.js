app.controller('profileController', ['$scope', 'authService', '$location','$http', function($scope, authService, $location,
$http) {

    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }

    $scope.editName = function() {
        // Edit the name
    };

    var getProfile = function() {
        $scope.name = "Name";
    }

    getProfile();    
}]);
