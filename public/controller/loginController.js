//angular.module('SD')
app.controller('loginController', ['$scope', 'authService', '$location', 'loggedIn', '$http', '$rootScope',
function($scope, authService, $location, 
loggedIn, $http, $rootScope){
	// checking authentication
	console.log(loggedIn);
	if(loggedIn){
		console.log(authService.Auth.$getAuth());
		// the current user's profile page 
		$rootScope.isNavbar = true;
		$location.path('/profile/' + authService.Auth.$getAuth().uid);
	}
	// getting data
	
	$scope.classes = [];
	$scope.majors = [];
	$scope.studyHabits = [];

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
	
	getClasses();
	getMajors();
	getStudyHabits();


	// picking classes that a person is in 
	$scope.classFilter = '';
	$scope.selectedClasses = {};
	$scope.quantity = 5;

	// picking a major that a person is in 
	$scope.majorFilter = '';
	$scope.selectedMajor;
	

	// picking study habits that a person has 
	$scope.studyHabitFilter = '';
	$scope.selectedHabits = {};
	


	$scope.isLogin = true; // display login form first to user 
	$scope.email = '';
	$scope.password = '';
	$scope.age = '';
	$scope.firstName = '';
	$scope.lastName = '';
	$scope.bio = '';

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
			$location.path('/profile/' + data.uid);
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
				console.log(data.uid);
				var classList = [];
				var habitList = [];
				for(var i in $scope.selectedClasses){
					classList.push(i);
				}
				console.log(classList);
				for(var i in $scope.selectedHabits){
					habitList.push(i);
				}
				console.log(habitList);
				$http({
					method: "POST",
					url: '/api/student',
					data: {
						_id : data.uid,
						Email : $scope.email,
						FirstName : $scope.firstName,
						LastName : $scope.lastName,
						Bio : $scope.bio,
						Age : $scope.age,
						Major : $scope.selectedMajor,
						Class : classList,
						Habit : habitList
					}
				}).then(function(){
					$rootScope.isNavbar = true;
					$location.path('/profile/' + data.uid);
				});
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