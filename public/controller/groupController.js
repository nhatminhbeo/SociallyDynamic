app.controller('groupController', ['$scope', 'authService', '$location', 'currentUser', '$http', '$rootScope',
function($scope, authService, $location, 
currentUser, $http, $rootScope){
// make sure to include this kind of thing later on to make sure 
// non-authenticated users don't have access to this 
/*if(!currentUser){
    $location.path('/');
    $rootScope.isNavbar = false;
}
if(currentUser){
    $rootScope.isNavbar = true;
}*/
$scope.groupController = "Hello from group controller";
console.log(currentUser);

}]);