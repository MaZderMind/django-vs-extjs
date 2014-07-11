Ext.define('MyApp.controller.Login', {
	extend: 'Ext.app.Controller',
	mixins: ['Ext.mixin.Observable'],
	views: ['Login'],

	// pointers into the view
	refs: [
		{ 'ref': 'userField', selector: '#user' },
		{ 'ref': 'passField', selector: '#pass' },
		{ 'ref': 'submitButton', selector: '#submit' }
	],

	// stored user information as received from the server
	userinfo: null,

	// controller initialisation
	init: function() {
		// save the scope
		var loginController = this;

		// create an instance of the view
		var win = loginController.loginWindow = loginController.getView('Login').create();

		this.control({
			// register for the login-click
			'#submit': {
				click: function() {
					// retrieve username & password from view
					var
						username = this.getUserField().getValue(),
						password = this.getPassField().getValue();

					// mask the form out
					win.mask('Verifying…');

					// process the login with the backend
					loginController.performLogin(username, password, function(success) {
						// the user was successfully authorized
						if(success) {
							// now request additional information on the user (name and such)
							loginController.fetchLoginStatus(function(userinfo) {
								// test if the server responded with data as expected
								if(userinfo) {
									// hide the login-window
									win.hide();

									// store received information locally
									loginController.userinfo = userinfo;

									// raise a event on the controller when finished
									loginController.fireEvent('success', userinfo);
								}

								// we did not receive valid data from the server
								// this sould not fail, but if it does, just handle it like a failed login
								else {
									// disable the login on the form
									win.unmask();

									// set error-message on password-field
									loginController.clearPasswordAndFocus().setPasswordError('Invalid Username or Password!');
								}
							})
						}

						// authorization was not successful
						// unmask the form, show an error message and restart login process
						else {
							win.unmask();
							loginController.clearPasswordAndFocus().showError('Invalid Username or Password!');
						}
					})
				}
			}
		});

		// register keyboard handler
		this.nav = new Ext.KeyNav(win.getEl(), {
			// enter key -> login-button click
			enter: function() {
				loginController.getSubmitButton().fireEvent('click')
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
			//  -> the callback shouldn't be called multiple times
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
				// decode json-response
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

	// submit username & password to the backend
	performLogin: function(username, password, callback) {
		console.info('trying to log into backend with username=', username, 'password=', password.length, 'Chars');

		// send login data via ajax to the server and callback with result
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

	// ask the backend to throw away our session which makes us logged out
	performLogout: function(callback) {
		console.info('trying to log out from backend');

		// ensure userinfo is unset
		this.userinfo = null;

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

	// shorthand to test iff userinfo is available
	isLoggedIn: function() {
		// null -> false, string -> true
		return !!this.userinfo;
	},

	// shorthand to get the current username
	getUsername: function() {
		return this.isLoggedIn() ? this.userinfo.username : null;
	},

	// clears all form elements in the view
	clearForm: function() {
		this.loginWindow.unmask();
		this.getPassField().setValue('').unsetActiveError();
		this.getUserField().setValue('').unsetActiveError();
		this.getUserField().focus();
		return this;
	},

	// clears the password-field in the view and sets the typing-focus to it
	clearPasswordAndFocus: function() {
		this.getPassField().setValue('').focus();
		return this;
	},

	// set an error-message on the password-fieldy
	setPasswordError: function(msg) {
		this.getPassField().setActiveErrors([msg]);
		return this;
	}
});
