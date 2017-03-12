app.controller('navController', ['$scope', 'authService', '$location', '$http', '$rootScope', 
function($scope, authService, $location ,$http, $rootScope) {
    
    $scope.navBarContents = {
        contacts : false,
        inbox : false,
        partnerMatch : false,
        group : false
    };
    $scope.inboxToggles = {
        requests: false,
        conversations: false
    };

    $scope.res = {
        accept: true,
        deny: false
    }
    //$scope.friendRequestList = ["Sup","Hi","yo"];

    $scope.matching = {
        Class : "class",
        Major : "major",
        Habit : "habit",
        Waiting: "W"
    };
    $scope.loading = false;

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
        $scope.navBarContents.group = false;

        var currentUser = authService.Auth.$getAuth();

        
        $http({
            method: "GET",
            url: "/api/student/friend/" + currentUser.uid
        }).then(function (data) {

            $scope.friendList = data.data;
        });
        
    }

    // get match by something
    $scope.getMatch = function (type) {
        $scope.navBarContents.contacts = false;
        $scope.navBarContents.inbox = false;
        $scope.navBarContents.partnerMatch = true;
        $scope.navBarContents.group = false;

        $scope.matchList = [];
        if (type == $scope.matching.Waiting) {
            return;
        }
        $scope.loading = true;

        var currentUser = authService.Auth.$getAuth();
        $http({
            method: "GET",
            url: "/api/match/" + type + "/" + currentUser.uid
        }).then(function (data) {
            $scope.loading = false;
            $scope.matchList = data.data;

        });        
    };

    $scope.getInbox = function (type){
        $scope.navBarContents.contacts = false;
        $scope.navBarContents.partnerMatch = false;
        $scope.navBarContents.inbox = true;
        $scope.navBarContents.group = false;
        $scope.getRequests();
    };

    $scope.getRequests = function(){
        $scope.inboxToggles.conversations = false;
        $scope.inboxToggles.requests = true;
        var currentUser = authService.Auth.$getAuth();

        $http({
            method: "GET",
            url: "/api/inbox/friend/" + currentUser.uid,
        }).then(function(data){
            console.log(data);
            $scope.friendRequestList = data.data;
        });
    };

    $scope.goToProfile = function (id) {
        $location.path('/profile/'+id);
    };

    $scope.responseFriend = function (accept, otherId, index) {
        $scope.friendRequestList.splice(index,1);
        var currentUser = authService.Auth.$getAuth();
        $http({
            method: "DELETE",
            url: "/api/friend/request/",
            data: {
                "Sender": otherId,
                "Receiver": currentUser.uid
            },
            headers: {
                "Content-type": "application/json;charset=utf-8"
            }

        }).then(function (){
            if (accept) {
                return $http({
                    method: "POST",
                    url: "/api/friend",
                    data: {
                        "Sender": otherId,
                        "Receiver": currentUser.uid
                    }
                });
            }
        });
    };

    $scope.getGroup = function () {
        $scope.navBarContents.contacts = false;
        $scope.navBarContents.partnerMatch = false;
        $scope.navBarContents.inbox = false;
        $scope.navBarContents.group = true;

        var currentUser = authService.Auth.$getAuth();

        $http({
            method: "GET",
            url: "/api/group/user/" + currentUser.uid,
        }).then(function(data){
            console.log(data);
            $scope.groupList = data.data;
        });
    }
}]);