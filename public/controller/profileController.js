app.controller('profileController', ['$scope', 'authService', '$location','$http', function($scope, authService, $location,
$http) {

    var DEBUG = true;

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

        $scope.name = "Name";
        $scope.classList = "Class List";
        $scope.userBio = "User Bio";
        $scope.studyHabit = "Study Habit";
    }

    getProfile();
    $scope.isSelf = true;
}]);
