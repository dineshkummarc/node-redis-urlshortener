dojo.registerModulePath("shorteh", "../shorteh");
dojo.require("shorteh.SiteMap");
dojo.require("shorteh.service.Locator");

dojo.addOnLoad(function() {
  var ctrlIniter = mojo.controller.Map.getInstance();
  ctrlIniter.setSiteMap(shorteh.SiteMap);
  ctrlIniter.mapControllers(window.location.href);
});

