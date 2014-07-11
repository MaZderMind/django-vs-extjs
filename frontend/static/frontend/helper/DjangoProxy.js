Ext.define('MyApp.helper.DjangoProxy', {
	extend: 'Ext.data.proxy.Rest',
	alias: 'proxy.django',

	// ExtJS sends partitial updates by default (only the changed fields)
	// The REST-Apis PUT-MEthod-Handler expects complete Records and fails if fields are missing
	// We correct this by telling ExtJS to send a PATCH-Request instead of POST for updates
	// Djangos The REST-Api handles PATCH like POST but without the check for completion
	actionMethods: {create: 'POST', read: 'GET', update: 'PATCH', destroy: 'DELETE'},

	// encode sorting-parameter the way Django wants it
	encodeSorters: function(sorters) {
		var sorter = sorters[0];
		return (sorter.getDirection() == 'DESC' ? '-' : '') + sorter.getProperty();
	}
});
