Ext.define('MyApp.controller.Polls', {
	extend: 'Ext.app.Controller',
	views: ['Polls'],
	stores:['Polls'],

	init: function() {
		this.view = this.getView('Polls').create();

		// register polls-view in the navigation
		MyApp.getApplication().getController('Navigation')
			.registerNavigationItem('polls', 'poll-management', this.view);
	}
});
