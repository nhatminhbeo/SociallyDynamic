app.controller('navController', ['$scope', 'authService', '$location', '$http', function($scope, authService, $location
,$http) {
    $scope.isNavbar = true;
    $scope.navController = "navController works yayy!!!";
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }
}]);