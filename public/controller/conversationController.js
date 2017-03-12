
app.controller('conversationController', ['$scope', 'authService', '$location','$http', 'currentUser', '$routeParams', 'socket', function($scope, authService, $location,
 $http, currentUser,$routeParams, socket) {
    $scope.conversationController = "conversationController";
    $scope.message="";
    $scope.messages = []; // holds all the messages
    $scope.currentUserid = currentUser.uid;
socket.emit('a','a');

//logout
    $scope.logout = function() {
        // log user out
        authService.Auth.$signOut().then(function(){
            $location.path('/');
        });
}


//get first 50 msgs if there exist 
    $http({
        method: "GET",
        url: "/api/conversation/" + $routeParams.id
    }).then(function (data) {
        console.log(data);
        $scope.data = data.data;
        for (var i = 0; i < data.data.length; i++) {
            $scope.messages.push(data.data[i]);
            socket.emit('personal message ' + ConversationID, data);        	
        }
    });



//receive new messages
socket.on("personal message" + ConversationID, function (msg) {
    $scope.messages.push(msg);    	
})

 //take user inputted message and give  to  backend
   $scope.userSendMessage = function(){
    	$scope.message = $scope.message.trim();
    	if($scope.message=="") {
    		return;
    	}
    	socket.emit('personal message ' + ConversationID, {"Content": $scope.message,
    	 "Sender": currentUser.uid});
    	$scope.message = "";
    }

}]);


// Stuff should be done for conversationController:
//  - Get the current URL
//  - Strip the ConversationID from the URL
//  - HTTP GET request to /api/conversation/:id using the conversationID above
//    This should give you 50 most recent messages of the conversation of both
//    senders in form:
//      [ {
//          Sender: String -- id of the sender,
//          SenderFirstName: String -- First name of the sender,
//          Content: message 
//      },
//          .......
//      ]
//  - Populate your array so that it shows up the message properly 
//    (if Sender = currentUser then it's someone the current user sent)
//    (False otherwise)
//  - tell Shiva to import the socket io client side SDK:
//      <script src="/socket.io/socket.io.js"></script>
//  - Send server-side socket.io the conversation ID first:
//      socket.emit('personal message', {"ConversationID": ConversationID})
//  - Now the backend will create a unique chat event for this conversation
//      in form ("personal message" + ConversationID). Start listen from backend
//      for this event:
//      socket.on("personal message" + ConversationID, function (msg) {
//          // This msg is a msg from someone else (including you actually) that has 
//          // been sent to client side. This is where you push new message to your
//          // arrays.
//          // msg is JSON object of form {
//          //    Content: the message,
//          //    Sender: id of the sender,
//          //    SenderName: First name of the sender
//          //   }
//      });
//  - You have just finished listening from backend, now just have to send new
//      message to backend (when user hit the send button), and backend will take
//      that message and send to whoever is in this conversation.
//      Do:
//      socket.emit('personal message ' + ConversationID, data)
//      Data should be JSON object of form {
//          Content: the message,
//          Sender: id of the user who sent the message. should be currentUser.uid    
//      }
//
//  YOU SHOULD BE GUCHE TILL HERE

