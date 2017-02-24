angular.module('SD').service('auth', [function() {
	var config = {
		apiKey: "AIzaSyDtiFe2ByyvW6WdAG5kZ5N0VSjisERPSTk",
	    authDomain: "sdauth-613ae.firebaseapp.com",
	    databaseURL: "https://sdauth-613ae.firebaseio.com",
	    storageBucket: "sdauth-613ae.appspot.com",
	    messagingSenderId: "650339617682"
	};
	this.Auth = firebase.initializeApp(config);
	this.testvar2 = "testvar2 in auth.js";
}]);