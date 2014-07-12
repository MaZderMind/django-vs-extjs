Ext.define('MyApp.helper.DjangoReader', {
	extend: 'Ext.data.reader.Json',
	alias: 'reader.django',

	// by default the root-property is used for all responses.
	// GET /polls/ returns an object like this:
	// {'count': 3, 'results': [{'id': 5, 'question': 'foo?'}, ..., ...]}
	//
	// here the rootProperty is obviously 'results'.
	//
	// But calls like POST /polls/ return only the raw, posted object:
	// {'id': 5, 'question': 'foo?'}
	//
	// here the rootProperty should be ''.
	//
	// ExtJS can't work with changing rootProperties so we hack our own
	// getRoot function and inject it into the reader

	// total property (in list mode)
	totalProperty: 'count',

	// buildExtractors overwrites sets getRoot to a accessor function
	// we overwrite buildExtractors so we can add our own
	buildExtractors: function() {
		var r = this.callParent(arguments);
		this.getRoot = this.dynamicGetRoot;
		return r;
	},

	// our dynamic getRoot method tries its best to return what we expect
	dynamicGetRoot: function(data) {
		// record has an id property -> it is a single record respionse
		if(data.id) return data;

		// record has a results property -> return results array
		if(data.results) return data.results;

		// none of both -> return null
		return null;
	}
});
