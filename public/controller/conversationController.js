app.controller('conversationController', ['$scope', 'authService', '$location','$http', 'currentUser', '$routeParams', function($scope, authService, $location,
 $http, currentUser, $routeParams) {

    $scope.message="";
    $scope.messages = []; // holds all the messages]
    var ConversationID = $routeParams.id;
    $scope.currentUserid = currentUser.uid;
    $scope.friendName = "";
    var showMoreStart = 0;
    $scope.showButton = false;

    var socket = io();

    // Mark that the current person has seen
    $http({
        method: "PUT",
        url: "/api/conversation/" + ConversationID,
        data: {
            "SeenPerson": currentUser.uid
        }
    });

    //get first 50 msgs if there exist 
    $scope.getConversation = function() {
        $http.get("/api/conversation/"  + $routeParams.id, {
            headers: {
                "start": 0,
                "sender": currentUser.uid
            }
        }).then(function (data) {
            console.log(currentUser.uid);
            console.log("hello");
            console.log(data);
            //get name of friend
            $scope.friendName = data.data.SenderFirstName + " " + data.data.SenderLastName;
            $scope.messages = data.data.Messages;
            if ($scope.messages.length == 15){
                $scope.showButton = true;
            }
            else{
               $scope.showButton = false;
            }
            setTimeout(function() {
                var element = document.getElementById("scroll");
                element.scrollTop = element.scrollHeight;
            }, 1);
        });  
    }

    $scope.getConversation();  

    socket.emit('personal message', {"ConversationID": ConversationID});
//splice message array for 25
    //receive new messages
    socket.on('personal message ' + ConversationID, function (msg) {
        $scope.messages.push(msg);
        if($scope.messages.length > 15){
            $scope.messages = $scope.messages.slice(1, $scope.messages.length);
            $scope.showButton = true;
        }
        else{
            $scope.showButton = false;
        }
        $scope.$digest();
        //console.log(msg);
        //console.log($scope.messages); 
        var element = document.getElementById("scroll");
        element.scrollTop = element.scrollHeight;
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

    $scope.showMoreMessages = function(){
        showMoreStart = showMoreStart + 15;
        $http.get("/api/conversation/"  + $routeParams.id, {
            headers: {
                "start": showMoreStart,
                "sender": currentUser.uid
            }
        }).then(function (data) {
            if(data.data.Messages.length == 15) {
                $scope.showButton = true;
            }
            else{
                $scope.showButton= false;
            }
            $scope.messages= data.data.Messages.concat($scope.messages);
            console.log($scope.messages);
        });
    };

}]);