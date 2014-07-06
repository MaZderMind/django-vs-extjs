Ext.application({
	name: 'MyApp',
	appFolder : '/static/frontend',
	controllers: ['Login', 'Navigation'],

	launch: function () {
		// ensure the user is logged in before showing her the main navigation with all our application goodies
		this.getController('Login').ensureLoggedIn(function(userinfo) {
			console.info('Login-Controller ensured that user', userinfo.user.username, 'is is currently loggeg in. Proceeding to navigation.')
			Ext.Msg.alert('MyApp', 'Ready to go as '+userinfo.user.username+'!');
		});
	}
});
