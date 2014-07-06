Ext.define('MyApp.controller.Login', {
	extend: 'Ext.app.Controller',
	mixins: ['Ext.mixin.Observable'],
	views: ['Login'],

	username: null,

	init: function() {
		this.loginWindow = this.getView('Login').create();
	},

	// ask the backend if and which user is currently logged in
	testLoginStatus: function(callback) {
		console.log('requesting current username from backend');
		Ext.Ajax.request({
			url: '/username/',
			success: function(response){
				var username = Ext.util.JSON.decode(response.responseText);
				// callback with the decoded response
				console.log('received username-info:', username);
				callback(username);
			}
		});
	},

	// test if the user is logged in.
	// if she is, call back immediatly. if she is not, show a login form
	// delay the callback until she logged in successfully
	ensureLoggedIn: function(callback) {
		// save the scope
		var loginController = this;

		// test if the backend knows us
		loginController.testLoginStatus(function(username) {
			// store the retrieved username
			loginController.username = username;

			// analyze if a user is logged in and callback, if she is
			if(username) {
				return callback(username);
			}

			// no, we're not. show the login-window
			console.log('no user logged in, showing login-window');
			loginController.loginWindow.show();
			//loginWindow.on('submitted', ...)
		});
	},
	
	isLoggedIn: function() {
		// null -> false, string -> true
		return !!this.username;
	},
	
	getUsername: function() {
		return this.username;
	}
});
