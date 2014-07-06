Ext.define('MyApp.view.Login', {
	extend: 'Ext.window.Window',
	title: 'Login',
	width: 400,
	layout: 'form',
	bodyPadding: 5,

	closable: false,
	resizable: false,
	draggable: false,

	defaultFocus: 'user',

	clearPasswordAndFocus: function() {
		this.down('#pass').setValue('').focus();
		return this;
	},

	showError: function(msg) {
		this.down('#pass').setActiveErrors([msg]);
		return this;
	},

	listeners: {
		// save the scope

		afterRender: function() {
			var submitButton = this.down('#submit');

			// register keyboard handler
			this.nav = new Ext.KeyNav(this.getEl(), {
				enter: Ext.bind(submitButton.handler, submitButton)
			});
		}
	},

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
		itemId: 'submit',
		handler: function() {
			// get a reference to the window
			var win = this.up('window');

			// trigger a login-click on the window with the entered values
			win.fireEvent('login-click',
				win.down('#user').getValue(),
				win.down('#pass').getValue()
			);
		}
	}]
});
