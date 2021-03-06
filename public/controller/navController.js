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
        if($scope.navBarContents.contacts == true){
            $scope.navBarContents.contacts = false;
            return;
        }
        $scope.navBarContents.contacts = true;
        $scope.navBarContents.inbox = false;
        $scope.navBarContents.partnerMatch = false;
        $scope.navBarContents.group = false;
        $scope.loading = true;

        var currentUser = authService.Auth.$getAuth();

        
        $http({
            method: "GET",
            url: "/api/student/friend/" + currentUser.uid
        }).then(function (data) {

            $scope.friendList = data.data;
            $scope.loading = false;
        });
        
    }

    // get match by something
    $scope.getMatch = function (type) {
      /*  if($scope.navBarContents.partnerMatch == true){
            $scope.navBarContents.partnerMatch = false;
            return;
        }*/
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
        if($scope.navBarContents.inbox == true){
            $scope.navBarContents.inbox = false;
            return;
        }
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
        $scope.loading = true;
        $http({
            method: "GET",
            url: "/api/inbox/friend/" + currentUser.uid,
        }).then(function(data){
            console.log(data);
            $scope.friendRequestList = data.data;
            $scope.loading = false;
        });
    };

    $scope.getMessages = function() {
        $scope.inboxToggles.conversations = true;
        $scope.inboxToggles.requests = false;
        $scope.loading = true;
        var currentUser = authService.Auth.$getAuth();

        $http({
            method: "GET",
            url: "/api/inbox/message/" + currentUser.uid,
        }).then(function(data){
            console.log(data);
            $scope.conversationList = data.data;
            $scope.loading = false;
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
        if($scope.navBarContents.group == true){
            $scope.navBarContents.group == false;
            return;
        }
        $scope.navBarContents.contacts = false;
        $scope.navBarContents.partnerMatch = false;
        $scope.navBarContents.inbox = false;
        $scope.navBarContents.group = true;
        $scope.loading = true;

        $scope.groupList = [];

        var currentUser = authService.Auth.$getAuth();

        $http({
            method: "GET",
            url: "/api/group/user/" + currentUser.uid,
        }).then(function(data){
            console.log(data);
            $scope.groupList = data.data;
            $scope.loading = false;
        });
    };

    $scope.toCreateGroup = function () {
        $location.path('/createGroup');
    }

    $scope.toGroupConversation = function (groupId) {
        $location.path('/group/conversation/' + groupId);
    };

    $scope.goToGroup = function (groupId) {
        $location.path('/group/' + groupId);

    };

    $scope.goToConversation = function (conversationId, index) {
        $scope.conversationList[index].Unseen = 0;
        $location.path('/conversation/' + conversationId);
    };

    $scope.converse = function (otherId) {
        var currentUser = authService.Auth.$getAuth();
        $http({
            method: "GET",
            url: "/api/conversation",
            headers: {
                "first": currentUser.uid,
                "second": otherId
            }
        }).then(function (data) {
            console.log(data);
            if (data.data["ConversationID"]) {
                console.log("Conversation Exist, going to /conversation/" + data.data["ConversationID"]);
                $location.path("/conversation/" + data.data["ConversationID"]);
            }
            else {
                console.log("Conversation doesn't exist");
                $http({
                    method: "POST",
                    url: "/api/conversation",
                    data: {
                        "First": currentUser.uid,
                        "Second": otherId
                    }
                }).then(function (data) {
                    if(data.data["ConversationID"]) {
                        console.log("New conversation created, going to /conversation/" + data.data["ConversationID"]);
                        return $location.path("/conversation/" + data.data["ConversationID"]);
                    }
                });
            }
        });

    };
}]);