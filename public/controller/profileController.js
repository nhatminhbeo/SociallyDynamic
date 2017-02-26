app.controller('profileController', ['$scope', 'authService', '$location', function($scope, authService, $location) {
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }
}]);