'use strict';
var assert = require('assert');
var helpers = require('./helpers');
var fs = require('fs');
var grunt = require('grunt');
var Regarde = require('../lib/regarde');

describe('Regarde', function (){
  before(helpers.directory('temp'));

  // it('should be able to take a new watched class and use it', function () {
  //   var called = false;
  //   var myWatcher = function() { called = true; };
  //   var r = new Regarde(grunt, myWatcher);
  //   assert(called);
  // });

  it('should check each of the target has a correct config');
  it('should forbid config with no task and events false');
  it('should filter tasks to keep only strings and arrays');
  it('should emit events if no task is given');
  it('should send event when a file is modified', function (done) {
    grunt.log.muted = true;
    grunt.config.init();
    grunt.config('regarde', {fred: {files: '*.txt', events: true }});
    grunt.file.write('fred.txt', '1');

    grunt.event.on('regarde:file:changed', function (file) {
      console.log("FRED: file:changed");
      assert.equal(file, 'fred.txt');
      done();
    });

    var watcher = new helpers.testWatcher();

    var r = new Regarde(grunt, watcher);

    // Simulate a file change.
    watcher.fileChange('fred.txt')

  });

  it('should launch a task upon file change when requested');
});