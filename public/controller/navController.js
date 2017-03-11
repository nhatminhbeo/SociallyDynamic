app.controller('navController', ['$scope', 'authService', '$location', '$http', '$rootScope', 
function($scope, authService, $location ,$http, $rootScope) {
    
    $scope.navBarContents = {
        contacts : false,
        inbox : false,
        partnerMatch : false
    };

    $scope.match = {
        Class : "class",
        Major : "major",
        Habit : "habit"
    };

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

    $scope.friendList = [];


    // get friendlist, save in $scope.friendList
    $scope.getFriendList = function() {
        $scope.navBarContents.contacts = true;
        $scope.navBarContents.inbox = false;
        $scope.navBarContents.partnerMatch = false;

        var currentUser = authService.Auth.$getAuth();
        console.log(currentUser.uid);
        
        $http({
            method: "GET",
            url: "/api/student/friend/" + currentUser.uid
        }).then(function (data) {
            console.log(data);
            $scope.friendList = data.data;
        });
        
    }

    // get match by something
    $scope.getMatch = function (type) {
        $scope.navBarContents.contacts = false;
        $scope.navBarContents.inbox = false;
        $scope.navBarContents.partnerMatch = true;

        var currentUser = authService.Auth.$getAuth();
        $http({
            method: "GET",
            url: "/api/match/" + type + "/" + currentUser.uid
        }).then(function (data) {
            $scope.matchList = data.data;
            console.log($scope.matchList);
        });        
    }
}]);