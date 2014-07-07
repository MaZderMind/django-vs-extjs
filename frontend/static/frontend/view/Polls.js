Ext.define('MyApp.view.Polls', {
	extend: 'Ext.grid.Panel',
	id: 'polls',
	title: 'Polls',

	store: 'Polls',

	dockedItems: [{
		xtype: 'pagingtoolbar',
		dock: 'bottom',
		store: 'Polls',
		displayInfo: true
	}],

	selType: 'rowmodel',
	plugins: [
		Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 1
		})
	],

	listeners: {
		beforerender: function() {
			alert('beforerender');
			this.store.load();
		}
	},

	columns: [
		{text: 'Question',  dataIndex: 'question', flex: 1, editor: {
			xtype: 'textfield',
			allowBlank: false
		}},
		{text: 'Publication-Date', dataIndex: 'pub_date', width: 200, editor: {
			xtype: 'textfield',
			allowBlank: false
		}}
	]
});
