var express = require('express');

// create an instance of `jsplugs` and load all the plugs under ./middleware
// now middleware contains an ordered hash of all the plugs and their require()ed payload.
var middleware = require('..')().require('./middleware');

var server = express.createServer();
for (var mw in middleware) {
    console.log('using', mw);
    server.use(middleware[mw]);
}

server.listen(8080);
