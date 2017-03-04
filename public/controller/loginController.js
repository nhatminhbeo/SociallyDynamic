//angular.module('SD')
app.controller('loginController', ['$scope', 'authService', '$location', 'loggedIn', '$http', '$rootScope',
function($scope, authService, $location, 
loggedIn, $http, $rootScope){
	$scope.classes = [];

	$http({
		method: 'GET',
		url: '/api/data/class'
	}).then(function(data){
		console.log(data);
		for (var i = 0; i < data.data.length; i++){
			$scope.classes.push(data.data[i].Name);
		}
		
	});

	// picking classes that a person is in 
	$scope.classFilter = '';
	$scope.selectedClasses = {};
	//$scope.classes = ["CSE 30", "CSE 12", "CSE 11", "CSE 145", "CSE 150", "CSE 153", "CSE 154", "AAS 15"];
	$scope.quantity = 5;

	// picking a major that a person is in 
	$scope.majorFilter = '';
	$scope.selectedMajor;
	$scope.majors = ["Computer Science", "Math-Computer Science", "Social Studies", "Swag", "Swole", "Swoon"];

	// picking study habits that a person has 
	$scope.studyHabitFilter = '';
	$scope.selectedHabits = {};
	$scope.studyHabits = ["Bed Programming", "Light Music", "quiet", "I'm cool", "I like everything", "It's awesome"];


	console.log(loggedIn);
	if(loggedIn){
		console.log(authService.Auth.$getAuth());
		// the current user's profile page 
		$rootScope.isNavbar = true;
		$location.path('/profile/' + authService.Auth.$getAuth().providerData["0"].uid);
	}

	$scope.isLogin = true; // display login form first to user 
	$scope.email = '';
	$scope.password = '';

	// this function will change the display from login form to sign up form 
	$scope.changeForm = function(){
		$scope.isLogin ? $scope.isLogin = false : $scope.isLogin = true;
		console.log($scope.isLogin);
		$scope.email = '';
		$scope.password = '';
	};

	// this function is responsible for logging in to the application 
	$scope.signIn = function(){
		authService.Auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(function(data){
			console.log(data);
			$rootScope.isNavbar = true;
			$location.path('/profile/' + data.providerData["0"].uid);
		}).catch(function(error){
			console.log(error);
			alert(error);
		});
	}

	$scope.testvar = "testvar in loginController.js";
	$scope.yo = authService.testvar2;
	console.log("Touched in loginController.js");
	console.log($scope.yo);
	console.log(authService);
	$scope.createAccount = function(){
		// TODO check frontend validation service
		// TODO validation on email address 

		// create the user with email and password 
		authService.Auth.$createUserWithEmailAndPassword($scope.email, $scope.password).then(function(data){
				console.log(data);
				$rootScope.isNavbar = true;
				$location.path('/profile/' + data.providerData["0"].uid);
			}).catch(function(error){
				console.log(error);
				alert(error);
		});
	};
	
	// class list function
	$scope.classFunc = function(c) {
		console.log(c);
		if(!$scope.selectedClasses[c]){
			$scope.selectedClasses[c] = c;
		}
	};

	// major-related function
	$scope.majorFunc = function(m){
		console.log(m);
		$scope.selectedMajor = m;
	};

	// studyt habits function
	$scope.studyHabitFunc = function(s){
		console.log(s);
		if(!$scope.selectedHabits[s]){
			$scope.selectedHabits[s] = s;
		}
	};
	// delete a selected class 
	$scope.deleteClassFunc = function(c){
		delete $scope.selectedClasses[c];
	}

	// delete selected habits
	$scope.deleteHabitFunc = function(h){
		console.log(h);
		delete $scope.selectedHabits[h];
	};

	// change major 
	$scope.deleteMajor = function(m){
		$scope.selectedMajor = '';
	};

}]);