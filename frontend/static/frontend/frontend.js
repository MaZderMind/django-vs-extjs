Ext.application({
	// base-package of all classes
	name: 'MyApp',

	// url to load js-files from
	appFolder : '/static/frontend',

	// required controllers
	controllers: ['Login', 'Navigation', 'Polls'],

	// other required components
	requires: ['MyApp.helper.CrsfTokenHelper'],

	// application launch method
	launch: function () {
		// save the scope
		var app = this;

		// ensure the user is logged in before showing her the main navigation with all our application goodies
		app.getController('Login').ensureLoggedIn(function(userinfo) {
			console.info('Login-Controller ensured that user', userinfo.username, 'is is currently loggeg in. Proceeding to navigation.')

			// upate display of the navigation conteoller and show it
			app.getController('Navigation')
				.updateUserinfo(userinfo)
				.view.show();
		});
	}
});
