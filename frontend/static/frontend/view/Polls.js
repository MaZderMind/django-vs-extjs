Ext.define('MyApp.view.Polls', {
	extend: 'Ext.grid.Panel',
	id: 'polls',
	title: 'Polls',

	store: 'Polls',

	dockedItems: [{
		xtype: 'pagingtoolbar',
		dock: 'bottom',
		displayInfo: true
	}],

	listeners: {
		beforerender: function() {
			alert('beforerender');
			this.store.load();
		}
	},

	columns: [
		{ text: 'Question',  dataIndex: 'question', flex: 1 },
		{ text: 'Publication-Date', dataIndex: 'pub_date', width: 200 }
	]
});
