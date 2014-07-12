Ext.define('MyApp.store.Polls', {
	requires: ['MyApp.helper.DjangoProxy'],
	extend: 'Ext.data.Store',
	model: 'MyApp.model.Poll',

	remoteSort: true,
	remoteFilter: true,

	// über 3g sollte man ggf. nur alle 5 sekunden syncen oder so
	autoSync: true,

	// Defaults to 25.
	pageSize: 50,

	proxy: {
		type: 'django',
		url: '/api/polls/'
	}
});
