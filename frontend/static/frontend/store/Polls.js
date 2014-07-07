Ext.define('MyApp.store.Polls', {
	extend: 'Ext.data.Store',

	remoteSort: true,
	remoteFilter: true, // todo: test!!

	proxy: {
		type: 'rest',
		url: '/api/polls/',
		reader: {
			type: 'json',
			rootProperty: 'results',
			totalProperty: 'count'
		}
	},

	fields: ['question', 'pub_date']
});
