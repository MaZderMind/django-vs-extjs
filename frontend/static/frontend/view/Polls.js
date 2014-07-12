Ext.define('MyApp.view.Polls', {
	extend: 'Ext.grid.Panel',
	id: 'polls',
	title: 'Polls',

	// store the grid is bound to
	store: 'Polls',

	// paging bar
	dockedItems: [{
		xtype: 'pagingtoolbar',
		dock: 'bottom',
		store: 'Polls',
		displayInfo: true
	}],

	// select complete rows
	selType: 'rowmodel',

	plugins: [
		// enable row editor
		Ext.create('Ext.grid.plugin.RowEditing', {
			// on double-click
			clicksToEdit: 2
		})
	],

	listeners: {
		beforerender: function() {
			// load store-content when the user first visits the view
			this.store.load();
		}
	},

	// configure columns
	columns: [
		{
			text: 'Question',
			dataIndex: 'question',
			flex: 1,
			filter: 'string',
			editor: {
				xtype: 'textfield',
				allowBlank: false
			}
		}, {
			text: 'Publication-Date',
			dataIndex: 'pub_date',
			xtype: 'datecolumn',
			format:'l, d. F Y',
			width: 200,
			editor: {
				xtype: 'datefield',
				format: 'd.m.Y',
				allowBlank: false
			}
		}
	]
});
