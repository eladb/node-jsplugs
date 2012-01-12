var jsplugs = require('../lib/jsplugs');
var path = require('path');

process.chdir(path.join(__dirname, 'plugins'));

exports.directory = function(test) {
    var manager = jsplugs();
    manager.require('dir1');
    test.deepEqual(Object.keys(manager.plugs), [ 'zzzzzzz', 'aaa', 'plug3', 'unordered' ]);
    test.done();
};

exports.multipleDirectories = function(test) {
    var manager = jsplugs();
    manager.require('dir1');
    manager.require('dir2');
    test.deepEqual(Object.keys(manager.plugs), [ 'zzzzzzz', 'yyyyy', 'aaa', 'bbb', 'plug3', 'unordered', 'unordered2' ]);
    test.done();
};

exports.varargs = function(test) {
    var manager = jsplugs();
    manager.require('dir1', 'dir2');
    test.deepEqual(Object.keys(manager.plugs), [ 'zzzzzzz', 'yyyyy', 'aaa', 'bbb', 'plug3', 'unordered', 'unordered2' ]);
    test.done();
};

exports.file = function(test) {
    var manager = jsplugs();
    manager.require('dir1/unordered.js', 'dir2');
    test.deepEqual(Object.keys(manager.plugs), [ 'yyyyy', 'bbb', 'unordered', 'unordered2' ]);
    test.done();
};

exports.array = function(test) {
    var manager = jsplugs();
    manager.require('dir1/unordered.js', [ 'dir2', 'dir1/200.aaa.js' ]);
    test.deepEqual(Object.keys(manager.plugs), [ 'yyyyy', 'bbb', 'aaa', 'unordered', 'unordered2' ]);
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