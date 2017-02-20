var SD = angular.module('SD' , [])
.config(['$routeProvider','$locationProvider',function($routeProvider , $locationProvider){
		$routeProvider.
			when('/', {
				templateUrl: 'view/scenes/login.html',
				controller: indexController
			}).
			/*
			when('/login', {
				templateUrl: 'scenes/login.html',
				controller: loginController
			}).
			when('/group', {
				templateUrl: 'scenes/group.html',
				controller: groupController
			}).
			when('/match', {
				templateUrl: 'scenes/match.html',
				controller: matchController
			}).
			when('/profile', {
				templateUrl: 'scenes/profile.html',
				controller: profileController
			}).
			*/
			otherwise({
				redirectTo: 'scenes/404.html'
			});
			$locationProvider.html5Mode(true);

}]);


// Main controller here for generic navbar + login check
