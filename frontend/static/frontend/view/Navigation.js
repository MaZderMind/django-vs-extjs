Ext.define('MyApp.view.Navigation', {
	layout: 'border',
	extend: 'Ext.container.Container',
	renderTo: Ext.getBody(),
	//extend: 'Ext.window.Window',
	width: '100%',
	height: '100%',

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
