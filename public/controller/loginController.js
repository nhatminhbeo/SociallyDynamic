/*SD.controller('loginController', ['Auth','$scope', function($scope , Auth){
    $scope.testvar = 'hi';

}]);
*/
function loginController($scope, Auth){
    $scope.testvar = 'hi';
    Auth.$onAuth(function(authData){
        console.log(authData);
    })
    $scope.login = function(){
        
    }

    $scope.signUp = 

}