//angular.module('SD')
app.controller('loginController', ['$scope', 'authService', '$location', 'loggedIn','$http', function($scope, authService, $location, 
loggedIn, $http){

	console.log(loggedIn);
	if(loggedIn){
		$location.path('/profile');
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
			$location.path('/profile');
		}).catch(function(error){
			console.log(error);
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
				$location.path('/profile');
			}).catch(function(error){
				console.log(error);
		});
	};
}]);