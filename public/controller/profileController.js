app.controller('profileController', ['$scope', 'authService', '$location','$http', function($scope, authService, $location,
$http) {

    var DEBUG = true;
    var DUMMY_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    // Limit for search
    $scope.quantity = 5;

    // Picking classes that a person is in 
    // TODO: replace with real data
    $scope.classFilter = '';
    $scope.classes = ["CSE 30", "CSE 12", "CSE 11", "CSE 145", "CSE 150", "CSE 153", "CSE 154", "AAS 15"];

    // Picking a major that a person is in 
    // TODO: replace with real data
    $scope.majorFilter = '';
    $scope.majors = ["Computer Science", "Computer Engineering", "Math-Computer Science", "Social Studies", "Swag", "Swole", "Swoon"];

    // Picking study habits that a person has 
    // TODO: replace with real data
    $scope.studyHabitFilter = '';
    $scope.studyHabits = ["Light Music", "Quiet", "I'm cool", "I like everything", "It's awesome", "Bed Programming", "Loud Music", "Random Screaming"];

    $scope.logout = function() {
        // Log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }

    $scope.modifyMajor = function() {

        // Modify Major
        if (DEBUG) {
            console.log("modifyMajor() called");
            console.log("Before: " + $scope.isEdit_major);
        }

        // Save changes to DB
        if ($scope.isEdit_major) {

            if (DEBUG) {
                console.log("Saving changes to DB");
                console.log($scope.major);
            }

            // TODO

            // Clear the search box
            $scope.majorFilter = '';
        }

        // Toggile editability
        $scope.isEdit_major = !$scope.isEdit_major;

        // Toggle button text
        $scope.majorBtn = $scope.isEdit_major ? "Save" : "Edit";

        if (DEBUG) {
            console.log("After: " + $scope.isEdit_major);
        }
    }

    $scope.changeMajor = function(aMajor) {

        if (DEBUG) {
            console.log(aMajor);
        }

        $scope.major = aMajor;
    }

    $scope.modifyClassList = function() {

        // Modify User Class List
        if (DEBUG) {
            console.log("modifyClassList() called");
            console.log("Before: " + $scope.isEdit_classList);
            console.log(document.getElementsByClassName("classList"));
        }

        // Save changes to DB
        if ($scope.isEdit_classList) {

            if (DEBUG) {
                console.log("Saving changes to DB");
                console.log($scope.classList);
            }

            // TODO

            // Clear the search box
            $scope.classFilter = '';
        }

        // Toggle editability
        $scope.isEdit_classList = !$scope.isEdit_classList;

        // Toggle button text
        $scope.classListBtn = $scope.isEdit_classList ? "Save" : "Edit";

        if (DEBUG) {
            console.log("After: " + $scope.isEdit_classList);
        }
    }

    // Delete a class
    $scope.deleteClass = function(aClass) {

        if (DEBUG) {
            console.log(aClass);
        }

        delete $scope.classList[aClass];
    }

    // Add a class
    $scope.addClass= function(aClass) {

        if (DEBUG) {
            console.log(aClass);
        }

        if(!$scope.classList[aClass]){
            $scope.classList[aClass] = "";
        }
    };

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
                console.log($scope.userBio);
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

        // Modify Study Habits
        if (DEBUG) {
            console.log("modifyStudyHabit() called");
            console.log("Before: " + $scope.isEdit_studyHabit);
            console.log(document.getElementsByClassName("studyHabit"));
        }

        // Save changes to DB
        if ($scope.isEdit_studyHabit) {

            if (DEBUG) {
                console.log("Saving changes to DB");
                console.log($scope.studyHabit);
            }

            // TODO

            // Clear the search box
            $scope.studyHabitFilter = '';
        }

        // Toggle editability
        $scope.isEdit_studyHabit = !$scope.isEdit_studyHabit;

        // Toggle button text
        $scope.studyHabitBtn = $scope.isEdit_studyHabit ? "Save" : "Edit";

        if (DEBUG) {
            console.log("After: " + $scope.isEdit_studyHabit);
        }

    };

    // Delete a study habit
    $scope.deleteStudyHabit = function(aStudyHabit) {

        if (DEBUG) {
            console.log(aStudyHabit);
        }

        delete $scope.studyHabit[aStudyHabit];
    }

    // Add a study habit
    $scope.addStudyHabit = function(aStudyHabit) {

        if (DEBUG) {
            console.log(aStudyHabit);
        }

        if(!$scope.studyHabit[aStudyHabit]){
            $scope.studyHabit[aStudyHabit] = "";
        }
    }

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

        $scope.DEBUG = DEBUG;

        // TODO: see if viewing own profile
        $scope.isSelf = true;
        $scope.isEdit_major = false;
        $scope.isEdit_classList = false;
        $scope.isEdit_studyHabit = false;

        // TODO: get stuff from the DB
        $scope.firstName = "First";
        $scope.lastName = "Last";
        $scope.major = "Computer Engineering";
        $scope.classList = {"CSE 11":"", "CSE 12":"", "CSE 30":""};
        $scope.userBio = DUMMY_TEXT;
        $scope.studyHabit = {"Bed programming":"", "Loud music":"", "Random screaming":""};

        if ( $scope.isSelf ) {
            $scope.majorBtn = "Edit";
            $scope.classListBtn = "Edit";
            $scope.userBioBtn = "Edit";
            $scope.studyHabitBtn = "Edit";
            $scope.viewMode = "View as Public";
        }
        else {
            $scope.viewMode = "View as Self";
        }
    }

    $scope.changeView = function() {

        if (DEBUG) {
            console.log("changeView() called");
            console.log("Before: " + $scope.isSelf);
        }

        $scope.isSelf = !$scope.isSelf;
        $scope.viewMode = $scope.isSelf ? "View as Public" : "View as Self";

        if (DEBUG) {
            console.log("After: " + $scope.isSelf);
        }
    }

    getProfile();
}]);