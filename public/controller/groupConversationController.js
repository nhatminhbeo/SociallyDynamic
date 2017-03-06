app.controller('groupConversationController', ['$scope', 'authService', '$location','$http', 'currentUser', function($scope, authService, $location,
 $http, currentUser) {
    $scope.groupConversationController = "groupConversationController";
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }
}]);