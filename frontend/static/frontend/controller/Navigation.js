Ext.define('MyApp.controller.Navigation', {
	extend: 'Ext.app.Controller',

	init: function() {
		console.log('Initialized Navigation! This happens before ' +
			'the Application launch() function is called');
	}
});
