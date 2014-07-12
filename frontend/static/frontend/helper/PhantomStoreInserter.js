Ext.define('MyApp.helper.PhantomStoreInserter', {
	singleton: true,

	constructor: function() {
		Ext.override(Ext.data.Store, {
			insertPhantom: function(index, rec) {
				if(!rec) rec = new (this.getModel())();

				var autoSync = this.autoSync;
				this.autoSync = false;
				this.insert(index || 0, rec);
				this.autoSync = autoSync;
				
				return rec;
			}
		});
	}
});
