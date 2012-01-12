var jsplugs = require('../lib/jsplugs');
var path = require('path');

process.chdir(path.join(__dirname, 'plugins'));

exports.directory = function(test) {
    var manager = jsplugs();
    manager.require('dir1');
    test.deepEqual(Object.keys(manager.plugs), [ 'unordered', 'zzzzzzz', 'aaa', 'plug3' ]);
    test.done();
};

exports.multipleDirectories = function(test) {
    var manager = jsplugs();
    manager.require('dir1');
    manager.require('dir2');
    test.deepEqual(Object.keys(manager.plugs), [ 'unordered', 'unordered2', 'zzzzzzz', 'yyyyy', 'aaa', 'bbb', 'plug3' ]);
    test.done();
};

exports.varargs = function(test) {
    var manager = jsplugs();
    manager.require('dir1', 'dir2');
    test.deepEqual(Object.keys(manager.plugs), [ 'unordered', 'unordered2', 'zzzzzzz', 'yyyyy', 'aaa', 'bbb', 'plug3' ]);
    test.done();
};

exports.file = function(test) {
    var manager = jsplugs();
    manager.require('dir1/unordered.js', 'dir2');
    test.deepEqual(Object.keys(manager.plugs), [ 'unordered', 'unordered2', 'yyyyy', 'bbb' ]);
    test.done();
};

exports.array = function(test) {
    var manager = jsplugs();
    manager.require('dir1/unordered.js', [ 'dir2', 'dir1/200.aaa.js' ]);
    test.deepEqual(Object.keys(manager.plugs), [ 'unordered', 'unordered2', 'yyyyy', 'bbb', 'aaa' ]);
    test.done();
};

exports.payload = function(test) {
    var manager = jsplugs();
    var plugs = manager.require('.');
    test.equals(plugs.aaa(), 'I am second');
    test.equals(plugs.yyyyy, 'hello');
    test.equals(plugs.unordered, 123);
    test.done();
};