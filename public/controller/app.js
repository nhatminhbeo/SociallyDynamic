var app = angular.module('SD' , ['ngRoute', 'firebase'])
.config(['$routeProvider','$locationProvider', function($routeProvider , $locationProvider){
		$routeProvider.
			when('/', {
				templateUrl: 'scenes/login',
				controller: 'loginController',
				resolve: {
					loggedIn: ['authService', function(authService){
						return authService.Auth.$waitForSignIn();
					}]
				}
			}).
			when('/group', {
				templateUrl: 'scenes/group.html',
				controller: 'profileController'
			}).
			/*
			when('/match', {
				templateUrl: 'scenes/match.html',
				controller: matchController
			}).*/
			when('/profile', {
				templateUrl: 'scenes/profile',
				controller: 'profileController'
			}).
			otherwise({
				redirectTo: 'scenes/404.html'
			});
			$locationProvider.html5Mode(true);

}]);


// Main controller here for generic navbar + login check