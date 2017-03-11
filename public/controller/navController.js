app.controller('navController', ['$scope', 'authService', '$location', '$http', '$rootScope', 
function($scope, authService, $location ,$http, $rootScope) {
    $rootScope.isNavbar = false;
    if($location.path() != '/'){
        $rootScope.isNavbar = true;
    }
    $scope.navController = "navController works yayy!!!";
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $rootScope.isNavbar = false;
            $location.path('/');
        });
    }

    // get friendlist, save in $scope.friendList
    function getFriendList() {
        $http({
            method: "GET",
            url: "/api/student/friend/" + $rootScope.currentUser.uid
        }).then(function (data) {
            $scope.friendList = data.data;
        });
    }

    // get match by something
    function getMatch(type) {

    }
}]);