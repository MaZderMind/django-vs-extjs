Ext.define('MyApp.view.Login', {
	extend: 'Ext.window.Window',
	renderTo: Ext.getBody(),
	id: "loginBox",

	title: 'Login',
	width: 400,
	layout: 'form',
	bodyPadding: 5,

	closable: false,
	resizable: false,
	draggable: false,

	defaultFocus: 'user',

	defaultType: 'textfield',
	items: [{
		itemId: 'user',
		fieldLabel: 'Username',
		allowBlank: false
	},{
		inputType: 'password',
		fieldLabel: 'Password',
		itemId: 'pass',
		allowBlank: false
	}],

	buttons: [{
		text: 'Login',
		itemId: 'submit'
	}]
});
