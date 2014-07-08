Ext.define('MyApp.controller.Login', {
	extend: 'Ext.app.Controller',
	mixins: ['Ext.mixin.Observable'],
	views: ['Login'],

	refs: [
		{ 'ref': 'userField', selector: '#user' },
		{ 'ref': 'passField', selector: '#pass' },
		{ 'ref': 'submitButton', selector: '#submit' }
	],

	userinfo: null,

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
			loginController.performLogin(username, password, function(success) {
				if(success) {
					// the user was successfully authorized
					// no request additional information on the user (name and such)
					loginController.fetchLoginStatus(function(userinfo) {
						// raise a event on the controller
						if(userinfo) {
							win.hide();
							loginController.userinfo = userinfo;
							loginController.fireEvent('success', userinfo);
						}
						else {
							// this sould not fail, but if it does, just handle it like a failed login
							win.unmask();
							loginController.clearPasswordAndFocus().setPasswordError('Invalid Username or Password!');
						}
					})
				}
				else {
					// nope, unmask the form, show an error message and restart login process
					win.unmask();
					loginController.clearPasswordAndFocus().showError('Invalid Username or Password!');
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
		loginController.fetchLoginStatus(function(userinfo) {
			// analyze if a user is logged in
			if(userinfo) {
				// callback, if she is
				loginController.userinfo = userinfo;
				return callback(userinfo);
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
			loginController.clearForm();
		});
	},

	// ask the backend if and which user is currently logged in
	fetchLoginStatus: function(callback) {
		console.info('requesting current userinfo from backend');
		Ext.Ajax.request({
			url: '/api/auth/user/',
			success: function(response) {
				var userinfo = Ext.util.JSON.decode(response.responseText);

				// callback with the decoded response
				console.log('received userinfo:', userinfo);
				callback(userinfo);
			},
			failure: function(response) {
				// callback without info
				console.log('received no userinfo - nobody logged in');
				callback();
			}
		});
	},

	performLogin: function(username, password, callback) {
		console.info('trying to log into backend with username=', username, 'password=', password.length, 'Chars');
		Ext.Ajax.request({
			url: '/api/auth/login/',
			method: 'POST',
			params: {
				'username': username,
				'password': password
			},
			success: function(){
				callback(true);
			},
			failure: function() {
				callback(false);
			}
		});
	},

	performLogout: function(callback) {
		console.info('trying to log out from backend');
		Ext.Ajax.request({
			url: '/api/auth/logout/',
			method: 'GET',
			success: function(){
				callback(true);
			},
			failure: function() {
				callback(false);
			}
		});
	},

	isLoggedIn: function() {
		// null -> false, string -> true
		return !!this.userinfo;
	},
	
	getUsername: function() {
		return this.userinfo.user.username;
	},

	clearForm: function() {
		this.loginWindow.unmask();
		this.getPassField().setValue('').unsetActiveError();
		this.getUserField().setValue('').unsetActiveError();
		this.getUserField().focus();
		return this;
	},

	clearPasswordAndFocus: function() {
		this.getPassField().setValue('').focus();
		return this;
	},

	setPasswordError: function(msg) {
		this.getPassField().setActiveErrors([msg]);
		return this;
	}
});
