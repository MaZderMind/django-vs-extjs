Ext.define('MyApp.store.Polls', {
	requires: ['MyApp.helper.DjangoProxy'],
	extend: 'Ext.data.Store',

	remoteSort: true,
	remoteFilter: true, // todo: test!!

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
