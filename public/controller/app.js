var app = angular.module('SD', [])

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'scenes/index.html',
				controller: indexController
			}).
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
			otherwise({
				templateUrl: 'scenes/404.html'
			});
}]);


// Main controller here for generic navbar + login check