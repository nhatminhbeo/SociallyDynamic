//angular.module('SD')

app.service('authService', ['$firebaseAuth', function($firebaseAuth) {
	var config = {
		apiKey: "AIzaSyDtiFe2ByyvW6WdAG5kZ5N0VSjisERPSTk",
	    authDomain: "sdauth-613ae.firebaseapp.com",
	    databaseURL: "https://sdauth-613ae.firebaseio.com",
	    storageBucket: "sdauth-613ae.appspot.com",
	    messagingSenderId: "650339617682"
	};
	firebase.initializeApp(config);
	this.Auth = $firebaseAuth();
	this.testvar2 = "testvar2 in auth.js";
}]);
