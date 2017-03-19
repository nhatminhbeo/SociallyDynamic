//angular.module('SD')

app.service('authService', ['$firebaseAuth', function($firebaseAuth) {
	var config = {
		apiKey: "AIzaSyAjoi07KYEJhZcu718XD-6lf-H6-LJg4T0",
	    authDomain: "sdauth2.firebaseapp.com",
	    databaseURL: "https://sdauth2.firebaseio.com",
	    storageBucket: "sdauth2.appspot.com",
	    messagingSenderId: "594282898711"
	};
	firebase.initializeApp(config);
	this.Auth = $firebaseAuth();
	this.testvar2 = "testvar2 in auth.js";
}]);