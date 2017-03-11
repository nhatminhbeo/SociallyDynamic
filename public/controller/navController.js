app.controller('navController', ['$scope', 'authService', '$location', '$http', '$rootScope', 
function($scope, authService, $location ,$http, $rootScope) {
    
    $scope.navBarContents = {
        contacts : false,
        inbox : false,
        partnerMatch : false,
    }

    $rootScope.currentuser = '';
    $rootScope.myProfile = '';
    $rootScope.isNavbar = false;
    if($location.path() != '/'){
        $rootScope.isNavbar = true;
    }
    /*currentUser = authService.Auth.$waitForSignIn();
    console.log(currentUser);
    if(currentUser){
        $scope.myProfile = '/profile/' + currentUser.uid;
    }*/

    $scope.navController = "navController works yayy!!!";
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $rootScope.isNavbar = false;
            $location.path('/');
        });
    }

    // get friendlist, save in $scope.friendList
    $scope.getFriendList = function() {
        $scope.navBarContents.contacts = true;
        $http({
            method: "GET",
            url: "/api/student/friend/" + $rootScope.currentUser.uid
        }).then(function (data) {
            console.log(data);
            $scope.friendList = data.data;
        });
    }

    // get match by something
    function getMatch(type) {

    }
}]);