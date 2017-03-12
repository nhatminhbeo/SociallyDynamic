app.controller('createGroupController', ['$scope', 'authService', '$location','$http', 'currentUser', '$routeParams', function($scope, authService, $location,
$http, currentUser, $routeParams) {
    $scope.createGroupController = "createGroupController";

    //logout
    $scope.logout = function() {
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }

    // auto-complete
    $scope.friendsFilter = "";
    $scope.quantity = 5;
    $scope.selectedMembers = {};

    //create group fields
    $scope.groupName = "";
    $scope.groupInfo = "";

    $http({
        method: "GET",
        url: "/api/student/friend/" + currentUser.uid
    }).then(function (data) {
        console.log(data);
        $scope.data = data.data;
        for (var i = 0; i < data.data.length; i++) {
            $scope.data[i]["Name"] = $scope.data[i]["FirstName"] + " " + $scope.data[i]["LastName"]
        }
        console.log(data);
    });

    // add member into temp selected member list
    $scope.addMembers = function(id, name) {
        console.log("id: " + id);
        console.log("name: " + name);

        if (!$scope.selectedMembers[id]) {
            console.log("No stuff");
            $scope.selectedMembers[id] = name;
        }
        
        console.log($scope.selectedMembers);
    }

    // delete selected members
    $scope.deleteMembers = function(id) {
        delete $scope.selectedMembers[id];
        console.log($scope.selectedMembers);
    }

    // create group
    $scope.createGroup = function() {
        var name = $scope.groupName.trim();
        var info = $scope.groupInfo;
        var memberList = [];
        
        // make final list of members
        for (var key in $scope.selectedMembers) {
            console.log("key: " + key);
            memberList.push(key);
        }

        // check that all boxes are filled in
        if (name == "" || info == "" || memberList.length == 0) {
            alert("Please make sure all fields are filled in.");
            return;
        }

        $http({
            method: "POST",
            url: '/api/group',
            data: {
                name : name,
                owner : currentUser.uid,
                member : memberList
            }

            }).then(function(data){
            $location.path('/group/' + data.data);
        });
    }

    // cancel create group
    $scope.cancel = function() {
        $location.path('/profile/' + currentUser.uid) ;
    }
}]);