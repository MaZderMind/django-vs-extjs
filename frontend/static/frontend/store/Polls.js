Ext.define('MyApp.store.Polls', {
	requires: ['MyApp.helper.DjangoProxy'],
	extend: 'Ext.data.Store',

	remoteSort: true,
	remoteFilter: true, // todo: test!!

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
