dojo.provide("shorteh.service.Locator");
var __shortehServiceLocator = null;
dojo.declare("shorteh.service.Locator", mojo.service.Locator, {
	addServices: function() {
		this.addService(new mojo.service.Service("addShortenURL", "api", { format: "json", cache: false}));
	}
});

shorteh.service.Locator.getInstance = function() {
	if (__shortehServiceLocator == null) {
		__shortehServiceLocator = new shorteh.service.Locator();
	}
	return __shortehServiceLocator;
};
