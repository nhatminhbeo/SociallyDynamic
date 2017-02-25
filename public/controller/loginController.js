//angular.module('SD')
app.controller('loginController', ['$scope', 'authService', '$location', 'loggedIn', function($scope, authService, $location, loggedIn){

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
			}).catch(function(error){
				console.log(error);
		});

		$location.path('/profile');
	};
}]);