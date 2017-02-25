app.controller('profileController', ['$scope', 'authService', function($scope, authService) {
    $scope.logout = function() {
        console.log("Logged out!");
    };
}]);