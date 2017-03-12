app.controller('profileController', ['$scope', 'authService', '$location','$http', 'currentUser', '$routeParams', function($scope, authService, $location,
$http, currentUser, $routeParams) {

    var DEBUG = true;
    var DUMMY_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    if (!currentUser) {

        if (DEBUG) {
            console.log("Not logged in; redirecting");
        }

        $location.path('/');
    }
    else { // <-- Do not delete this

    // Limit for search
    $scope.quantity = 5;

    // Picking classes that a person is in 
    $scope.classFilter = '';
    $scope.classes = [];

    // Picking a major that a person is in 
    $scope.majorFilter = '';
    $scope.majors = [];

    // Picking study habits that a person has 
    $scope.studyHabitFilter = '';
    $scope.studyHabits = [];

    // Use to store retrieved user data
    var firstNameOld = "";
    var lastNameOld = "";
    var emailOld = "";
    var ageOld = 0;
    var majorOld = "";
    var classListOld = {};
    var userBioOld = "";
    var studyHabitOld = {};

    // Retrives the entire class data from the database
    var getClasses = function(){
        $http({
            method: 'GET',
            url: '/api/data/class'
        }).then(function(data){
            for (var i = 0; i < data.data.length; i++){
                $scope.classes.push(data.data[i].Name);
            }
            
        });
    }

    // Retrieves the entire major data from the database
    var getMajors = function(){
        $http({
            method: 'GET',
            url: '/api/data/major'
        }).then(function(data){
            for(var i = 0; i < data.data.length; i++){
                $scope.majors.push(data.data[i].MajorName);
            }
        });
    }

    // Retrives the entire study habits data from the database
    var getStudyHabits = function(){
        $http({
            method: 'GET',
            url: '/api/data/habit'
        }).then(function(data){
            for(var i = 0; i < data.data.length; i++){
                $scope.studyHabits.push(data.data[i].Habit);
            }
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

            majorOld = $scope.major;
            putStudent();

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

            classListOld = $scope.classList;
            putStudent();

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

            userBioOld = $scope.userBio;
            putStudent();
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

            studyHabitOld = $scope.studyHabit;
            putStudent();

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

    $scope.addFriend = function() {

        // Add Frend 
        if (DEBUG) {
            console.log("addFriend() called");
        }

        // HTTP GET request to check if already friends
        $http({
            method: "GET",
            url: "/api/friend/",
            headers: {
                'sender': currentUser.uid,
                'receiver': $routeParams.id
            }
        }).then( function(data) {

            if (DEBUG) {
                console.log(data);
            }

            // Check if already friends
            if (data.data !== "") {

                if (DEBUG) {
                    console.log("DELETE-ing a friend");
                }

                // TODO: HTTP DELETE request to delete the friend
                $http({
                    method: "DELETE",
                    url: "/api/friend/",
                    data: {
                        'Sender': currentUser.uid,
                        'Receiver': $routeParams.id
                    },
                    headers: {
                        'Content-type': 'application/json;charset=utf-8'
                    }
                });

                $scope.friendBtn = "Add as Friend"
            }

            // Check if adding another person
            else if (currentUser.uid !== $routeParams.id) {

                if (DEBUG) {
                    console.log("Attempting to add as a friend");
                }

                // HTTP GET request to check if a friend request is already pending
                $http({
                    method: "GET",
                    url: "/api/friend/request",
                    headers: {
                        'sender': currentUser.uid,
                        'receiver': $routeParams.id 
                    }
                }).then( function(data) {

                    if (DEBUG) {
                        console.log(data);
                    }

                    // Friend request exists; HTTP DELETE request to delete a friend request
                    if (data.data !== "") {

                        if (DEBUG) {
                            console.log("DELETE-ing a friend request");
                        }

                        $http({
                            method: "DELETE",
                            url: "/api/friend/request",
                            data: {
                                'Sender': currentUser.uid,
                                'Receiver': $routeParams.id
                            },
                            headers: {
                                'Content-type': 'application/json;charset=utf-8'
                            }
                        });

                        $scope.friendBtn = "Add as Friend";
                    }

                    // HTTP POST request to send a friend request
                    else {

                        if (DEBUG) {
                            console.log("POST-ing a friend request")
                        }

                        $http({
                            method: "POST",
                            url: "/api/friend/request",
                            data: {
                                'Sender': currentUser.uid,
                                'Receiver': $routeParams.id
                            }
                        });

                        $scope.friendBtn = "Cancel Friend Request";
                    }
                });

            }

            // Why are you trying to be friends with yourself?
            else {

                if (DEBUG) {
                    console.log("Why are you trying to be friends with yourself?");
                }

            }
        });
    }

    var getProfile = function() {

        if (DEBUG) {
            console.log("getProfile() called");
        }

        $scope.DEBUG = DEBUG;

        $scope.isSelf = currentUser.uid === $routeParams.id;
        $scope.isEdit_major = false;
        $scope.isEdit_classList = false;
        $scope.isEdit_studyHabit = false;
        $scope.recRec = false;

        $scope.firstName = "";
        $scope.lastName = "";
        $scope.email = "";
        $scope.age = 0;
        $scope.major = "";
        $scope.classList = {};
        $scope.userBio = "";
        $scope.studyHabit = {};

        if ($routeParams.id) {
            $http({
                method: "GET",
                url: "/api/student/" + $routeParams.id
            }).then (function (data) {
                firstNameOld = $scope.firstName = data.data.FirstName;
                lastNameOld = $scope.lastName = data.data.LastName;
                emailOld = $scope.email = data.data.Email;
                ageOld = $scope.age = data.data.Age;
                majorOld = $scope.major = data.data.Major;
                var classListArr = data.data.Class;
                userBioOld = $scope.userBio = data.data.Bio;
                var studyHabitArr = data.data.Habit;

                for (var i = 0; i < classListArr.length; i++) {
                    classListOld[classListArr[i]] = $scope.classList[classListArr[i]] = "";
                }

                for (var i = 0; i < studyHabitArr.length; i++) {
                    studyHabitOld[studyHabitArr[i]] = $scope.studyHabit[studyHabitArr[i]] = "";
                }

                if (DEBUG) {
                    console.log(data);
                }
            });
        }

        // Initialize the text for all buttons
        $scope.majorBtn = "Edit";
        $scope.classListBtn = "Edit";
        $scope.userBioBtn = "Edit";
        $scope.studyHabitBtn = "Edit";
        $scope.friendBtn = "Add as Friend"

        // HTTP GET request to check if already friends
        $http({
            method: "GET",
            url: "/api/friend/",
            headers: {
                'sender': currentUser.uid,
                'receiver': $routeParams.id
            }
        }).then(function(data) {

            if (DEBUG) {
                console.log(data);
            }

            // Check if already friends
            if (data.data !== "") {

                if (DEBUG) {
                    console.log("Already friends");
                }


                $scope.friendBtn = "Unfriend";
            }
        });

        // HTTP GET request to check if a friend request is already pending
        $http({
            method: "GET",
            url: "/api/friend/request",
            headers: {
                'sender': currentUser.uid,
                'receiver': $routeParams.id 
            }
        }).then( function(data) {

            if (DEBUG) {
                console.log(data);
            }

            // Friend request exists
            if (data.data !== "") {

                if (DEBUG) {
                    console.log("Friend request exists");
                }

                $scope.friendBtn = "Cancel Friend Request";
            }
        });

        // HTTP GET request to check if a friend request was received 
        $http({
            method: "GET",
            url: "/api/friend/request",
            headers: {
                'receiver': currentUser.uid,
                'sender': $routeParams.id 
            }
        }).then( function(data) {

            if (DEBUG) {
                console.log(data);
            }

            // Friend request exists
            if (data.data !== "") {

                if (DEBUG) {
                    console.log("Friend request exists");
                }

                $scope.friendBtn = "Check Yor Inbox";
                $scope.reqRec = true;
            }
        });

        // For DEBUG purposes only
        $scope.viewMode = $scope.isSelf ? "View as Public" : "View as Self";
    }

    var putStudent = function () {
        
        var put = {
            FirstName: firstNameOld,
            LastName: lastNameOld,
            Email: emailOld,
            Bio: userBioOld,
            Major: majorOld,
            Age: ageOld,
            Class: [],
            Habit: []
        };

        for (item in classListOld) {
            put["Class"].push(item);
        }

        for (item in studyHabitOld) {
            put["Habit"].push(item);
        }
        console.log(put["Class"]);
        $http({
            method: "PUT",
            url: "/api/student/" + $routeParams.id,
            data: put
        });

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

    // Get data
    getClasses();
    getMajors();
    getStudyHabits();
    } // <-- Do not delete this
}]);