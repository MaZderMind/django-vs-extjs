Ext.define('MyApp.controller.Navigation', {
	extend: 'Ext.app.Controller',
	views: ['Navigation'],

	// pointers into the view
	refs: [
		{ 'ref': 'loginMessage', selector: '#loginMessage' },
		{ 'ref': 'navTree', selector: '#navTree' },
		{ 'ref': 'contentPanel', selector: '#contentPanel' }
	],

	// controller initialisation
	init: function() {
		// save scope
		var navigationController = this;

		// instanciate view class but hide initially
		this.view = this.getView('Navigation').create().hide();

		this.control({
			// register for the logout-click
			'#logoutButton': {
				click: function() {
					// mask the complete viewport
					this.view.mask('Logout…')

					// ask the login-controller to perform the logout in the backend
					MyApp.getApplication().getController('Login').performLogout(function(success) {
						if(!success) {
							// return WITHOUT unmasking the main app, keeping the app unusable
							return Ext.Msg.alert('Logout failed', 'Close and restart the Application')
						}

						// unmask and hide main viewport and all content
						navigationController.view.unmask();
						navigationController.view.hide();

						// relaunch application
						MyApp.getApplication().launch();
					});
				}
			},

			// register for click in the nvaigation tree
			'#navTree': {
				itemclick: function(tree, node) {
					// ignore clicks on group nodes
					// TODO: pass click on to first sub-item

					// ignore clicks on non-leave nodes (groups)
					if(!node.data.leaf) return;

					// pass the id of the clicked node to the content-panel
					// enable the corresponding content view
					this.getContentPanel().setActiveItem(node.data.itemId);
				}
			}
		})
	},

	// update view based on userinfo
	updateUserinfo: function(userinfo) {
		// the login-message view-component has a string-template, which in conjunction with
		// the suppied data will update the displayed text
		this.getLoginMessage().setData(userinfo);
		return this;
	},

	// this method is called by content-controllers to register their content-views with
	// the navigation. it adds the content-view to the content-card-layout-container
	// and a tree-node in the navigation
	registerNavigationItem: function(group, item, view) {
		// set the item-id of the content-view so we can find it agsain in the card-layout-container
		view.itemId = group+'.'+item;

		// add the content-view to the card-layout-container
		this.getContentPanel().add(view);

		// fetch the (hidden) root-node
		var root = this.getNavTree().store.getRootNode();

		// try to find the node for the supplied group-name
		var groupNode = root.findChild('itemId', group);
		if(!groupNode) {
			// no group-node found -> create onws
			groupNode = root.appendChild(root.createNode({
				leaf: false,
				expanded: true,
				// TODO: translate group and make the display-text nice and human-readable this way
				text: group,
				itemId: group
			}));
		}

		// add a node for the content-view to the navigation and give it the same itemId
		groupNode.appendChild(root.createNode({
			leaf: true,
			// TODO: translate group and make the display-text nice and human-readable this way
			text: item,
			itemId: view.itemId
		}));
	}
});
