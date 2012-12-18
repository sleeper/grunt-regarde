'use strict';

module.exports = function (grunt) {
  var Gaze = require('gaze').Gaze;
  var path = require('path');

  grunt.registerTask('regarde', 'Observe files on the filesystem', function (target) {
    var name = this.name;
    var config = grunt.config(name);
    var targets = target ? [target] : Object.keys(config);
    var done = this.async();

    targets = targets.map(function (target) { return [target, config[target]]; });

    targets.forEach(function (t) {
      var name = t[0];
      var target = t[1];
      var pattern = target.files;
      var options = {};

      var gaze = new Gaze(pattern, options, function (err, watcher) {
        if (err) {
          grunt.log.error(err.message);
          return done();
        }
        // On changed/added/deleted
        watcher.on('all', function (status, filepath) {
          filepath = path.relative(process.cwd(), filepath);
          grunt.event.emit('regarde:file:' + status, filepath);
        });
        // On watcher error
        watcher.on('error', function (err) { grunt.log.error(err); });
        grunt.event.emit('regarde:init:' + name + ':done');
      });
    });

  });
};