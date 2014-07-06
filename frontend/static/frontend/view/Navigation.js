Ext.define('MyApp.view.Navigation', {
	extend: 'Ext.container.Viewport',
	layout: 'border',

	items: [{
		region: 'west',
		xtype: 'treepanel',
		itemId: 'navPanel',

		width: 200,
		split: true,

		title: 'Navigation',
		tbar: [
			{ tpl: 'Logged in as {user.username}', xtype: 'label', itemId: 'loginMessage'},
			'->',
			{ text: 'Logout', itemId: 'logoutButton' }
		]
	},{
		region: 'center',
		xtype: 'container',
		itemId: 'contentPanel',
		layout: 'card',

		items: [
			{ title: 'Card 1', html: 'Card 1' },
			{ title: 'Card 2', html: 'Card 2' }
		]
	}]
});
