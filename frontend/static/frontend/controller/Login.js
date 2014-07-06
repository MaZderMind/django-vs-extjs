Ext.define('MyApp.controller.Login', {
	extend: 'Ext.app.Controller',
	mixins: ['Ext.mixin.Observable'],
	views: ['Login'],

	username: null,

	init: function() {
		// save the scope
		var loginController = this;

		// create a html representation of the window
		var win = loginController.loginWindow = loginController.getView('Login').create();

		// register for the login-click
		win.on('login-click', function(username, password) {
			// mask the form out
			win.mask('Verifying…');

			// process the login with the backend
			loginController.precessLogin(username, password, function(success) {
				if(success) {
					// the user was successfully authorized
					// raise a event on the controller
					loginController.fireEvent('success', username);
				}
				else {
					// nope, unmask the form, show an error message and restart login process
					win.unmask();
					win.clearPasswordAndFocus().showError('Invalid Username or Password!');
				}
			})
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

			// login-testing and re-trying is handled by the handler set in the init-method
			// it raises an event on the controller once it is finished
			// we listen on this event and relay it to our callback - but only once
			//  -> the callback can't be called twice
			loginController.on('success', callback, {single: true});

			// initiate login procedure by showing the login window
			loginController.loginWindow.show();
		});
	},

	// ask the backend if and which user is currently logged in
	testLoginStatus: function(callback) {
		console.info('requesting current username from backend');
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

	precessLogin: function(username, password, callback) {
		console.info('trying to log into backend with username=', username, 'password=', password.length, 'Chars');
		Ext.Ajax.request({
			url: '/api-auth/login/',
			data: {
				username: username,
				password: password
			},
			success: function(response){
				alert('success');
			}
		});
		callback(false);
	},

	isLoggedIn: function() {
		// null -> false, string -> true
		return !!this.username;
	},
	
	getUsername: function() {
		return this.username;
	}
});
