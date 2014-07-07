Ext.define('MyApp.view.Navigation', {
	layout: 'border',
	extend: 'Ext.container.Container',
	renderTo: Ext.getBody(),
	id: "navigationContainer",

	width: '100%',
	height: '100%',

	items: [{
		region: 'west',
		xtype: 'treepanel',
		itemId: 'navTree',

		width: 200,
		split: true,

		rootVisible: false,

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
		layout: {
			type: 'card',
			deferredRender: true
		},

		items: [
			{ title: 'Welcome-Page', html: 'I\'m a Welcome-Page' }
		]
	}]
});
