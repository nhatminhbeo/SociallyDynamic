app.controller('conversationController', ['$scope', 'authService', '$location','$http', 'currentUser', '$routeParams', function($scope, authService, $location,
 $http, currentUser, $routeParams) {

    console.log("FIX ME");
    $scope.message="";
    $scope.messages = []; // holds all the messages
    var ConversationID = $routeParams.id;

    var socket = io();

    //get first 50 msgs if there exist 
    $scope.getConversation = function() {
        $http.get("/api/conversation/"  + $routeParams.id, {
            headers: {
                "start": 0,
                "sender": currentUser.uid
            }
        }).then(function (data) {
            console.log("hello");
            console.log(data);
            $scope.data = data;
        });  
    }

    $scope.getConversation();  

    socket.emit('personal message', {"ConversationID": ConversationID});

    //receive new messages
    socket.on('personal message ' + ConversationID, function (msg) {

        $scope.messages.push(msg);  
        $scope.$digest();
        console.log("HI");
        //console.log(msg);
        //console.log($scope.messages); 
    });


    //take user inputted message and give  to  backend
    $scope.userSendMessage = function(){
        console.log("MINHHH");
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