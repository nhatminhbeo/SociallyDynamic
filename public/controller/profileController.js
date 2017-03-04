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
            console.log("modifyClassList() called");
            console.log(document.getElementsByClassName("classList"));
        }

        $scope.isEdit_classList = !$scope.isEdit_classList;
    }

    $scope.modifyUserBio = function() {

        var isDisabled = document.getElementById("userBio").disabled;

        // Modify User Bio
        if (DEBUG) {
            console.log("modifyUserBio() called");
            console.log("Before: " + isDisabled);
        }

        // Save changes to DB
        if (!isDisabled) {

            if (DEBUG) {
                console.log("Saving changes to DB");
            }

            // TODO

        }

        // Toggle editability
        isDisabled = document.getElementById("userBio").disabled = !isDisabled;

        // Toggle button text
        $scope.userBioBtn = isDisabled ? "Edit" : "Save";

        if (DEBUG) {
            console.log("After: " + isDisabled);
        }

    };

    $scope.modifyStudyHabit = function() {

        var isDisabled = document.getElementById("studyHabit").disabled;

        // Modify Study Habits
        if (DEBUG) {
            console.log("modifyStudyHabit() called");
            console.log("Before: " + isDisabled);
        }

        // Save changes to DB
        if (!isDisabled) {

            if (DEBUG) {
                console.log("Saving changes to DB");
            }

            // TODO

        }

        // Toggle editability
        isDisabled = document.getElementById("studyHabit").disabled = !isDisabled;

        // Toggle button text
        $scope.studyHabitBtn = isDisabled ? "Edit" : "Save";

        if (DEBUG) {
            console.log("After: " + isDisabled);
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

        // TODO: see if viewing own profile
        $scope.isSelf = true;
        $scope.isEdit_classList = false;

        // TODO: get stuff from the DB
        $scope.firstName = "First";
        $scope.lastName = "Last";
        $scope.classList = ["CSE 11", "CSE 12", "CSE 30"];
        $scope.userBio = DUMMY_TEXT;
        $scope.studyHabit = ["Bed programming", "Loud music", "Random screaming"];

        if ( $scope.isSelf ) {
            $scope.userBioBtn = "Edit";
            $scope.classListBtn = "Edit";
            $scope.studyHabitBtn = "Edit";
        }
    }

    getProfile();
}]);