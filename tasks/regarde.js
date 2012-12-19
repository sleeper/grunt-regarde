'use strict';

module.exports = function (grunt) {
  var Gaze = require('gaze').Gaze;
  var path = require('path');

  grunt.registerTask('regarde', 'Observe files on the filesystem', function (target) {
    var name = this.name;
    var config = grunt.config(name);

    // new Regarde(grunt);
    config = utils.checkConfig(config);

    var regarde = new Regarde(grunt.event);

    targets.forEach( function(t) {
      var pattern = config[t].files;
      var tasks = config[t].tasks;
      var events = config[t].events;

      regarde.add( pattern, tasks, events);

    });

    grunt.event.on('all', function(status, filepath, tasks) {
      // Run or spawn the tasks
      util.launchTasks( grunt, tasks );
    });



    var targets = target ? [target] : Object.keys(config);
    var done = this.async();

    targets = targets.map(function (target) { return [target, config[target]]; });

    targets.forEach(function (t) {
      var name = t[0];
      var target = t[1];
      var pattern = target.files;
      var options = {interval: 10};

      // var gaze = new Gaze(pattern, options, function (err, watcher) {
      //   if (err) {
      //     grunt.log.error(err.message);
      //     return done();
      //   }

      //   watcher.on('ready', function() {
      //     console.log("FRED: ready received");
      //     grunt.event.emit('regarde:init:' + name + ':done');
      //   });

      //   // On changed/added/deleted
      //   watcher.on('all', function (status, filepath) {
      //     console.log("FRED: detected : " + pattern);
      //     filepath = path.relative(process.cwd(), filepath);
      //     grunt.event.emit('regarde:file:' + status, filepath);
      //   });
      //   // On watcher error
      //   watcher.on('error', function (err) { grunt.log.error(err); });

      // });

      var gaze = new Gaze(pattern, options);
      gaze.on('ready', function (w) {
        console.log("FRED: ready !!!");
        grunt.event.emit('regarde:init:' + name + ':done');
      });
      gaze.on('error', function (err) { grunt.log.error(err); });
      gaze.on('all', function (status, filepath) {
          console.log("FRED: detected : " + pattern);
          filepath = path.relative(process.cwd(), filepath);
          grunt.event.emit('regarde:file:' + status, filepath);

      });


    });

  });
};