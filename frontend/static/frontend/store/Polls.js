Ext.define('MyApp.store.Polls', {
	requires: ['MyApp.helper.DjangoProxy'],
	extend: 'Ext.data.Store',
	model: 'MyApp.model.Poll',

	remoteSort: true,

	// das django rest framework kann nur auf gleichheit filtern, das reicht aber für extjs nicht.
	// sollte im backend eingebaut sein um effizient auch mit großen listen arbeiten zu können
	//remoteFilter: true,

	// über 3g sollte man ggf. nur alle 5 sekunden syncen oder so
	autoSync: true,

	// Defaults to 25.
	pageSize: 50,

	proxy: {
		type: 'django',
		url: '/api/polls/'
	}
});
