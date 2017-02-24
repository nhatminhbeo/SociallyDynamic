angular.module('SD').controller('loginController', ['$scope', 'auth', function($scope, auth){
	$scope.testvar = "testvar in loginController.js";
	$scope.yo = auth.testvar2;
	console.log("Touched in loginController.js");
	console.log($scope.yo);
	console.log(auth);
}]);