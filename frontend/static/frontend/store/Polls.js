Ext.define('MyApp.store.Polls', {
	requires: ['MyApp.helper.DjangoProxy'],
	extend: 'Ext.data.Store',

	remoteSort: true,

	// das django rest framework kann nur auf gleichheit filtern, das reicht aber für extjs nicht.
	// sollte im backend eingebaut sein um effizient auch mit großen listen arbeiten zu können
	//remoteFilter: true,

	// über 3g sollte man ggf. nur alle 5 sekunden syncen oder so
	autoSync: true,

	proxy: {
		type: 'django',
		url: '/api/polls/',
		reader: {
			type: 'json',
			rootProperty: 'results',
			totalProperty: 'count'
		}
	},

	fields: ['question', 'pub_date']
});
