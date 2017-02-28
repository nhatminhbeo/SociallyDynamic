var app = angular.module('SD' , ['ngRoute', 'firebase'])
.config(['$routeProvider','$locationProvider', function($routeProvider , $locationProvider){
		$routeProvider.
			when('/', {
				templateUrl: 'scenes/login.html',
				controller: 'loginController',
				resolve: {
					loggedIn: ['authService', function(authService){
						return authService.Auth.$waitForSignIn();
					}]
				}
			}).
			when('/contacts', {
				templateUrl: 'scenes/contacts',
				controller: 'profileController'
			}).
			when('/group', {
				templateUrl: 'scenes/group',
				controller: 'groupController'
			}).
			/*
			when('/match', {
				templateUrl: 'scenes/match.html',
				controller: matchController
			}).*/
			when('/profile/:id', {
				templateUrl: 'scenes/profile',
				controller: 'profileController'
			}).
			when('/conversation/:id', {
				templateUrl: 'scenes/conversation'	

			}).
			otherwise({
				redirectTo: 'scenes/404.html'
			});
			$locationProvider.html5Mode(true);

}]);


// Main controller here for generic navbar + login check