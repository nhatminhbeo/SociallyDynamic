//angular.module('SD')

app.service('authService', ['$firebaseAuth', function($firebaseAuth) {
	var config = {
	    apiKey: "AIzaSyASDCWsaRijj1cV4NR9pfo4NZNTp0oFt-A",
	    authDomain: "sdauth3-de1e4.firebaseapp.com",
	    databaseURL: "https://sdauth3-de1e4.firebaseio.com",
	    storageBucket: "sdauth3-de1e4.appspot.com",
	    messagingSenderId: "240896055276"
	  };
	firebase.initializeApp(config);
	this.Auth = $firebaseAuth();
	this.testvar2 = "testvar2 in auth.js";
}]);