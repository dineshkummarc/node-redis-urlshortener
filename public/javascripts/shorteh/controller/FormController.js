dojo.provide("shorteh.controller.FormController");
dojo.declare("shorteh.controller.FormController", mojo.controller.Controller, {
  addObservers: function() {
    
    this.addObserver(this.getContextElement(), "onsubmit", "ShortenURL", function(context) {
      return {
        url: mojo.queryFirst("input[type=url]", context).value
      };
    });
    //this.addObserver(this, "onInit", "Balls");
  },
  addCommands: function() { 
    this.addCommand("ShortenURL", "shorteh.command.ShortenURLCommand");
    this.addCommand("Balls", "shorteh.behavior.BallsBehavior");
  },
  addIntercepts: function() { }
});