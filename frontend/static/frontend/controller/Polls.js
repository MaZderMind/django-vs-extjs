Ext.define('MyApp.controller.Polls', {
	extend: 'Ext.app.Controller',
	views: ['Polls'],
	stores:['Polls'],

	refs: [
		{ 'ref': 'grid', selector: 'grid' },
	],

	init: function() {
		// save the scope
		var
			pollsController = this,
			loginController = MyApp.getApplication().getController('Login'),
			navigationController = MyApp.getApplication().getController('Navigation');

		this.control({
			'#tbDelete': {
				click: this.onRemoveRow
			},

			'#tbAdd': {
				click: this.onAddRow
			},

			'grid': {
				canceledit: this.onCancelEdit
			}
		});

		loginController.on('login', function() {
			pollsController.view = pollsController.getView('Polls').create();

			// register polls-view in the navigation
			if(loginController.hasPermission('add_poll'))
				navigationController.registerNavigationItem('polls', 'poll-management', pollsController.view);
		}, {single: true});
	},

	onAddRow: function() {
		// we have not defined an explicit model on the store but used an anonymous model
		// by specifying the fields-property
		// the store then
		var phantomRow = this.getStore('Polls').insertPhantom(0);
		var rowEditor = this.getGrid().findPlugin('rowediting');
		rowEditor.cancelEdit();
		rowEditor.startEdit(0, 0);
	},

	onRemoveRow: function() {
		Ext.each(this.getGrid().getSelection(), function(row) {
			row.drop();
		});
	},

	onCancelEdit: function(editor, context) {
		if (context.record.phantom)
			context.record.drop();
	}
});
