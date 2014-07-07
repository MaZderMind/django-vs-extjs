Ext.define('MyApp.helper.DjangoProxy', {
	extend: 'Ext.data.proxy.Rest',
	alias: 'proxy.django',

	encodeSorters: function(sorters) {
		var sorter = sorters[0];
		return (sorter.getDirection() == 'DESC' ? '-' : '') + sorter.getProperty();
	}
});
