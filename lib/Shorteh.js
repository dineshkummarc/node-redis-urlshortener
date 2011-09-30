
/*!
 * Shorteh
 * Copyright(c) 2011 Jaime Bueza <jaime.bueza@resaas.com>
 * MIT Licensed
 */

/**
 * Library version.
 */

exports.version = '0.0.1';

var redis = require('redis-node')
  , reds = require('reds')
  , redisClient = redis.createClient()
  , alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("")
  , base = alphabet.length
  , Shorteh = function() {};

Shorteh.execute = function execute(params) {
  var url = params['params']['url']
    , message = function() {
      return JSON.stringify({ Code: 404, Message: "Unable to find URL."});
    }()
    , now = new Date().getTime()
    , self = this
    , guid = self.createGuid();
        
  if ( !url.length ) return params.response.end(message);

  //search the db for the URL
  //if it doesn't exist
    // create it, get its GUID and auto incremented id
    //encode the id, return it to the servicd layer
  //if it does exist
    //get its encoded value and return it to the service layer
    
  redisClient.hgetall(encodeURI(url), function(err, data) {
    if (!data) {
      //it doesn't exist
      redisClient.dbsize( function (err, numKeys) { 
        //auto increment
        var id = numKeys + 1;
        var hash = self.encode(id);
        
        var data = {
            guid:         guid, 
            date:         now, 
            url:          encodeURI(url),
            hash:         hash,
            id:           id
        };
        
        redisClient.hmset(encodeURI(url), data, function(err, status) {
          params.response.end(self.JSONResponse({ code: 1, url: "http://resa.as:3000/" + data.hash }));
        });
      });
    } else {
      //it exists in the keystore, return its encoded value to the service layer
      params.response.end(self.JSONResponse({ code: 1, url: "http://resa.as:3000/" + data.hash }));
    }
  });
};

Shorteh.metrics = function metrics(params) {
  console.log("CALLING METRICS!");
  //params.response.end(JSONResponse({ Code: 1, Message: ""}))
  
};

Shorteh.redirect = function redirect(params) {
  var hash = params.hash;
  var complete = false;
  redisClient.keys('*', function(err, keys) {
    keys.forEach(function(key, index) {
      redisClient.hgetall(key, function(err, data) {
        if (data && hash == data.hash) {
          complete = true;
          params.response.redirect(data.url);
          
        }
      });
    });
    setTimeout(function() {
      if (!complete) params.response.redirect('/');
    }, 5000);
  });
};

/*
 * Function: JSONResponse
 * Provides an easy way of passing objects into it and returning a string representation
 * of the object.
 * @param members {Object}
 */
Shorteh.JSONResponse = function JSONResponse(members) {
  return JSON.stringify(members);
};

/*
 * Function: encode
 * @param id - {Integer} - Passing in an integer will return a base62 (alphabetical) value
 */

Shorteh.encode = function encode(id) {
  if (id == 0) return alphabet[0];
  var code = "";
  while (id > 0) {
    code += alphabet[id % base];
    id = parseInt(id / base, 10);
  }
  return code.split("").reverse().join("");
};

Shorteh.decode = function decode(code) {
  var i = 0;
  
  for ( var index = 0, len = code.length; index < len; index++) {
    var character = code[index];
    i = i * base + alphabet.indexOf(character);
  }
  return i;
};

Shorteh.createGuid = function createGuid() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

module.exports = Shorteh;