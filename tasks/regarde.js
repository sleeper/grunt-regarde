'use strict';

module.exports = function (grunt) {
  var utils = require('../lib/utils');
  var Regarde = require('../lib/regarde');

  grunt.registerTask('regarde', 'Observe files on the filesystem', function () {
    var name = this.name;
    var config = grunt.config(name);
    var targets;

    config = utils.checkConfig(config);
    targets = Object.keys(config);

    var regarde = new Regarde(grunt.event);

    targets.forEach(function (t) {
      var pattern = config[t].files;
      var tasks = config[t].tasks;
      var spawn = config[t].spawn;

      regarde.add(pattern, tasks, spawn);

    });

    grunt.event.on('all', function (status, filepath, tasks, spawn) {
      console.log('FRED');
      // Run or spawn the tasks
      utils.launchTasks(grunt, tasks, spawn);
    });

    // Keep the process alive
    setInterval(function () {}, 250);
    this.async();
  });
};