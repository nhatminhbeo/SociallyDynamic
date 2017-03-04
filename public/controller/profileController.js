app.controller('profileController', ['$scope', 'authService', '$location','$http', function($scope, authService, $location,
$http) {

    var DEBUG = true;
    var DUMMY_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }

    $scope.modifyClassList = function() {

        // Modify User Class List
        if (DEBUG) {
            console.log("modifyClassList() called")
        }
    }

    $scope.modifyUserBio = function() {

        // Modify User Bio
        if (DEBUG) {
            console.log("modifyUserBio() called");
        }

    };

    $scope.modifyStudyHabit = function() {

        // Modify User Bio
        if (DEBUG) {
            console.log("modifyStudyHabit() called");
        }

    };

    $scope.deleteUserProfile = function() {

        // Delete User Profile
        if (DEBUG) {
            console.log("deleteUserProfile() called");
        }

    };

    var getProfile = function() {

        if (DEBUG) {
            console.log("getProfile() called");
        }

        $scope.firstName = "First";
        $scope.lastName = "Last";
        $scope.classList = ["CSE 11", "CSE 12", "CSE 30"];
        $scope.userBio = DUMMY_TEXT;
        $scope.studyHabit = DUMMY_TEXT;
    }

    getProfile();
    $scope.isSelf = true;
}]);
