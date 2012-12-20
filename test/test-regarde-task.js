'use strict';
var assert = require('assert');
var grunt = require('grunt');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var fs = require('fs');

grunt.task.init([]);
grunt.config.init({});

var opts = grunt.cli.options;
opts.redirect = !opts.silent;

var directory = function directory(dir) {
  return function directory(done) {
    process.chdir(__dirname);
    rimraf(dir, function (err) {
      if (err) {
        return done(err);
      }
      mkdirp(dir, function (err) {
        if (err) {
          return done(err);
        }
        process.chdir(dir);
        done();
      });
    });
  };
};

describe('regarde task', function () {
  before(directory('temp'));

  it('should check each of the target has a correct config');
  it('should forbid config with no task and events false');
  it('should filter tasks to keep only strings and arrays');
  it('should emit events if no task is given');

  // it('should accept file patterns', function (done) {
  //   grunt.log.muted = true;
  //   grunt.config.init();
  //   grunt.config('regarde', {fred: {files: '*.txt', events: true }});
  //   grunt.file.write('fred.txt', '1');
  //   grunt.file.write('john.txt', '1');

  //   var changed = [];

  //   grunt.event.on('regarde:file:changed', function (file) {
  //     assert.equal(file, 'fred.txt');
  //     done();

  //     // changed.push(file);
  //     // console.log('FRED: ' + changed.length);
  //     // if (changed.length === 2) {
  //     //   // changed = changed.sort();
  //     //   // assert.equal(changed[0], "fred.txt");
  //     //   // assert.equal(changed[1], "john.txt");
  //     //   assert(true);
  //     //   done();
  //     // }
  //   });

  //   grunt.task.run('regarde');
  //   grunt.task.start();

  //   grunt.event.on('regarde:init:fred:done', function () {
  //     fs.writeFileSync('fred.txt', '2');
  //     fs.writeFileSync('john.txt', '2');
  //   });
  // });

  it('should send event when a file is modified', function (done) {
    grunt.log.muted = true;
    grunt.config.init();
    grunt.config('regarde', {fred: {files: 'fred.txt', events: true }});
    fs.writeFileSync('fred.txt', '1');

    grunt.event.on('regarde:file:changed', function (file) {
      assert.equal(file, 'fred.txt');
      done();
    });

    grunt.task.run('regarde:fred');
    grunt.task.start();

    grunt.event.on('regarde:init:fred:done', function () {
      // fs.writeFileSync('fred.txt', '2');
      grunt.file.write('fred.txt', '2');
    });
  });

  it('should launch a task upon file change when requested');
});