dojo.provide('shorteh.command.ShortenURLCommand');
dojo.declare('shorteh.command.ShortenURLCommand', mojo.command.Command, {
  execute: function(requestObj) {
    shorteh.service.Locator.getInstance().getService("addShortenURL").invoke(requestObj.getParams(), this);
  },
  onResponse: function(data) {
    var node = mojo.queryFirst("div.output");
    var shortenedUrl = mojo.queryFirst("input", node);
    shortenedUrl.value = data.url;

    dojo.fadeIn({node: node }).play();
    shortenedUrl.focus();
    shortenedUrl.select();
  },
  onError: function(err) {}
});