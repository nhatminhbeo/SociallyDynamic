app.controller('groupConversationController', ['$scope', 'authService', '$location','$http', function($scope, authService, $location,
 $http) {
    $scope.groupConversationController = "groupConversationController";
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
    }
}]);