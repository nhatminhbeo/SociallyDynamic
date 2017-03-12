app.controller('groupConversationController', ['$scope', 'authService', '$location','$http', 'currentUser', '$routeParams', function($scope, authService, $location,
 $http, currentUser, $routeParams) {

    $scope.conversationController = "conversationController";
    $scope.message="";
    $scope.messages = []; // holds all the messages
    $scope.currentUserid = currentUser.uid;

    var ConversationID = $routeParams.id;

    var socket = io();
/*
=======
socket.emit('a','a');
>>>>>>> df034b2a1990abb96a4417a10651e7ee19de1888

    //get first 50 msgs if there exist 
    $http({
        method: "GET",
        url: "/api/conversation/" + $routeParams.id
    }).then(function (data) {
        console.log(data);
        $scope.data = data.data;
        for (var i = 0; i < data.data.length; i++) {
<<<<<<< HEAD
            //	if(data.data[i]["Sender"] == currentUser.uid){
            // 		return;
            //	}
            $scope.messages.push(data.data[i]);
            socket.emit('personal message ' + ConversationID, data);
=======
            $scope.messages.push(data.data[i]);
            socket.emit('personal message ' + ConversationID, data);        	
>>>>>>> df034b2a1990abb96a4417a10651e7ee19de1888
        }
    });

*/

    socket.emit('personal message', {"ConversationID": ConversationID});

    //receive new messages
    socket.on('personal message ' + ConversationID, function (msg) {

        $scope.messages.push(msg);  
        $scope.$digest();
        console.log(msg);
        console.log($scope.messages); 	
    });


    //take user inputted message and give  to  backend
    $scope.userSendMessage = function(){
    	$scope.message = $scope.message.trim();
    	if($scope.message=="") {
    		return;
    	}

    	socket.emit('personal message ' + ConversationID, {
            "Content": $scope.message,
            "Sender": currentUser.uid
        });

        $scope.message="";
    };

}]);

