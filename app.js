
var express = require('express')
  ,  httpProxy = require('http-proxy')
  , Shorteh = require('./lib/Shorteh');
  
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express['static'](__dirname + '/public'));
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'RESA.AS'
  });
});

app.post('/api', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  Shorteh.execute({ params: req.body, response: res});
});

app.get('/:hash', function(req, res){
    var params = { hash : req.params.hash, response: res };
    if (req.params.hash.length) {
      Shorteh.metrics(params);
      Shorteh.redirect(params);
    }
});



// Only listen on $ node app.js

if (!module.parent) {

  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
