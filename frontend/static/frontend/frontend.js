Ext.application({
	name: 'MyApp',
	appFolder : '/static/frontend',
	controllers: ['Login', 'Navigation'],

	launch: function () {
		// save the scope
		var app = this;

		// ensure the user is logged in before showing her the main navigation with all our application goodies
		app.getController('Login').ensureLoggedIn(function(userinfo) {
			console.info('Login-Controller ensured that user', userinfo.user.username, 'is is currently loggeg in. Proceeding to navigation.')
			app.getController('Navigation')
				.create()
				.updateUserinfo(userinfo)
				.show();
		});
	}
});
