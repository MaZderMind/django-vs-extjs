Ext.define('MyApp.controller.Navigation', {
	extend: 'Ext.app.Controller',
	views: ['Navigation'],
	
	refs: [
		{ 'ref': 'loginMessage', selector: '#loginMessage' },
		{ 'ref': 'navTree', selector: '#navTree' },
		{ 'ref': 'contentPanel', selector: '#contentPanel' }
	],

	init: function() {
		// save scope
		var navigationController = this;

		// instanciate view class but hide initially
		this.view = this.getView('Navigation').create().hide();

		this.control({
			'#logoutButton': {
				click: function() {
					// mask the complete viewport
					this.view.mask('Logout…')

					// perform logout in backend
					MyApp.getApplication().getController('Login').performLogout(function(success) {
						if(!success) {
							// return WITHOUT unmasking the main app, keeping the app unusable
							return Ext.Msg.alert('Logout failed', 'Close and restart the Application')
						}

						// destroy main viewport and all content
						navigationController.view.unmask();
						navigationController.view.hide();

						// relaunch our application
						MyApp.getApplication().launch();
					});

				}
			}
		})
	},

	show: function() {
		this.view.show();
		return this;
	},

	updateUserinfo: function(userinfo) {
		this.getLoginMessage().setData(userinfo);
		return this;
	}
});
