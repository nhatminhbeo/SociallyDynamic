app.controller('createGroupController', ['$scope', 'authService', '$location','$http', 'currentUser', function($scope, authService, $location,
$http, currentUser) {
    $scope.createGroupController = "createGroupController";
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }

    // check if user has groups created already to view
    $scope.groupsExist = false;
    //check if user is an admin of group, to show delete button or not
    $scope.isAdmin = false;
    //check if user is viewing groups or creating a group
    $scope.viewGroups = false;


    // auto-complete
    $scope.friendsFilter = "";
    $scope.quantity = 5;
    $scope.selectedMembers = {};

    //create group fields
    $scope.groupName = "";

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
        if (name == "") {
            alert("Please add a group name.");
            return;
        }
    }

    // cancel create group
    //$scope.cancel = function() {}
}]);