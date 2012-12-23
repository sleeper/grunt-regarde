'use strict';

module.exports = function (grunt) {
  var utils = require('../lib/utils');
  var Regarde = require('../lib/regarde');
  var initialized = false;

  grunt.registerTask('regarde', 'Observe files on the filesystem', function (target) {
    var name = this.name;
    var nameArgs = grunt.task.current.nameArgs;
    var config = grunt.config(name);
    var done = this.async();
    var targets;

    if (initialized) {
      return;
    }
    initialized = true;

    config = utils.checkConfig(config);
    targets = target ? [target] : Object.keys(config);

    var regarde = new Regarde(grunt.event, function (msg, error) {
      if (error) {
        grunt.log.error(msg);
      } else {
        grunt.log.writeln(msg);
      }
    });
console.log('FRED: targets -> ' + targets);
    targets.forEach(function (t) {
      var pattern = config[t].files;
      var tasks = config[t].tasks;
      var spawn = config[t].spawn;
console.log('FRED: About to call add for ' + t);
      regarde.add(t, pattern, tasks, spawn);

    });

    grunt.event.on('regarde:file', function (status, filepath, tasks, spawn) {
      // Run or spawn the tasks
      grunt.verbose.writeln('File ' + filepath + ' ' + status + '. Tasks: ' + tasks);
      if (tasks) {
        utils.launchTasks(grunt, tasks, spawn);
      }

     // Enqueue the watch task, so that it loops.
      grunt.task.run(nameArgs).mark();
      done();
    });

    // Keep the process alive
    // setInterval(function () {}, 250);
  });
};