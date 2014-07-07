Ext.define('MyApp.view.Polls', {
	extend: 'Ext.grid.Panel',
	id: 'polls',
	title: 'Polls',

	store: 'Polls',
	autoLoad: true,

	dockedItems: [{
		xtype: 'pagingtoolbar',
		dock: 'bottom',
		displayInfo: true
	}],

	columns: [
		{ text: 'Question',  dataIndex: 'question', flex: 1 },
		{ text: 'Publication-Date', dataIndex: 'pub_date', width: 200 }
	]
});
