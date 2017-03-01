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
			when('/createGroup/:id', {
				templateUrl: 'scenes/group',
				controller: 'createGroupController'
			}).
			when('/profile/:id', {
				templateUrl: 'scenes/profile',
				controller: 'profileController'
			}).
			when('/conversation/:id', {
				templateUrl: 'scenes/conversation',
				controller: 'conversationController'

			}).
			when('/group/conversation/:id', {
				templateUrl: 'scenes/groupConversation',
				controller: 'groupConversationController'
			}).
			otherwise({
				templateUrl: 'scenes/404'
			});
			$locationProvider.html5Mode(true);

}]);


// Main controller here for generic navbar + login check