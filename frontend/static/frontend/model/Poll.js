Ext.define('MyApp.model.Poll', {
	extend: 'Ext.data.Model',
	
	idProperty: 'id',

	fields: [
		'question',
		{name: 'pub_date', type: 'date', dateFormat: 'c'}
	]
});
