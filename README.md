# jsplugs [![Build Status](https://secure.travis-ci.org/eladb/node-jsplugs.png)](http://travis-ci.org/eladb/node-jsplugs)

Dead-stupid init.d-like plugin manager for node.js.

```bash
$ npm install jsplugs
```

## Usage ##

### jsplugs() ###

Returns a _jsplugs_ object that contains plugs.

### jsplugs.require(...) ###

Loads plugs into the jsplugs object.

```js
require('/path/to/plugs')
require('/path/to/plugs/myplug.js')
require([ 'dir1', 'dir2', ... ])
require('dir1', 'myplug2.js', ...)
```

Returns `jsplugs.plugs`.

### jsplugs.plugs ###

Returns a hash of all the plugs loaded, in order. Each plug has an ordinal. Ordinals are a numeric prefix 
to plug filenames (e.g. the ordinal of `010.xyz.js` is 010). Files without an ordinal are always last.


## Using as Express Middleware ##

This example shows how to use _jsplugs_ to plug in middleware into an express server. jsplugs fits well here because
it supports ordering using ordinal prefix.

Given the directory structure:

 * ./middleware
 * ./middleware/050.cors.js
 * ./middleware/100.auth.js
 * ./middleware/120.log.js
 * ./middleware/200.app.js
 * ./middleware/999.errors.js

```js
var express = require('express');

// create an instance of `jsplugs` and load all the plugs under ./middleware
// now middleware contains an ordered hash of all the plugs and their require()ed payload.
var middleware = require('jsplugs')().require('./middleware');

var server = express.createServer();
for (var mw in middleware) {
    console.log('using', mw);
    server.use(middleware[mw]);
}

server.listen(8080);
```

Running:

```bash
$ node express.js &
[2] 65761
using auth
using log
using app
using errors
using cors

$ curl http://localhost:8080
in auth
in log
in app
in errors
```

## License

MIT