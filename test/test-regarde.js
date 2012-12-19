'use strict';
var assert = require('assert');
var helpers = require('./helpers');
var fs = require('fs');
var grunt = require('grunt');
var EventEmitter2 = require('eventemitter2').EventEmitter2;
var Regarde = require('../lib/regarde');

describe('Regarde', function (){
  var events;
  var watcher;
  var regarde;

  beforeEach(function() {
    events = new EventEmitter2({delimiter: ':'});
    watcher = new helpers.testWatcher();
    regarde = new Regarde(events, watcher);
  });

  // it('should check each of the target has a correct config');
  // it('should filter tasks to keep only strings and arrays');

  // it('should emit events if no task is given', function () {
  //   grunt.log.muted = true;
  //   grunt.config.init();
  //   grunt.config('regarde', {fred: {files: '*.txt'}, foo: {files: '*.foo'}});
  //   grunt.file.write('fred.txt', '1');

  //   var watcher = new helpers.testWatcher();

  //   var r = new Regarde(grunt, watcher);
  //   assert.equal(grunt.config('regarde').fred.events, true);
  //   assert.equal(grunt.config('regarde').foo.events, true);

  // });

  it('should send event when a file is modified', function (done) {
    events.on('regarde:file:changed', function (file, tasks) {
      assert.equal(file, 'fred.txt');
      assert.equal(tasks.length, 0);
      done();
    });

    // var regarde = new Regarde(events, watcher);
    regarde.add('*.txt', [], true);

    // Simulate a file change.
    watcher.fileChange('fred.txt')
  });


  it('should send the tasks as part of the event\'s argument', function (done){
    events.on('regarde:file:changed', function (file, tasks) {
      assert.equal(file, 'fred.txt');
      assert(tasks);
      assert.equal(tasks.length, 2);
      assert.equal(tasks[0], 'foo');
      assert.equal(tasks[1], 'bar');
      done();
    });

    // var regarde = new Regarde(events, watcher);
    regarde.add('*.txt', ['foo', 'bar'], true);

    // Simulate a file change.
    watcher.fileChange('fred.txt')
  });
});