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
				templateUrl: 'scenes/createGroup',
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
				templateUrl: 'scenes/404',
				resolve: {
					dontShow: ['$rootScope', function($rootScope){
					$rootScope.isNavbar = false;
					
					}]
				}
			});
			$locationProvider.html5Mode(true);

}]);
/*.run(function($rootScope,$location){
	$rootScope.$on("navState", function(event, next, current) {
		if(next.templateUrl == "scenes/login"){
			$rootScope.isNavbar = false;
			console.log("I am here!");
		}
		else if(next.templateUrl == "scenes/404"){
			$rootScope.isNavbar = false;
		}
		else {
			$rootScope.isNavbar = true;
		}

	});
});*/



// Main controller here for generic navbar + login check