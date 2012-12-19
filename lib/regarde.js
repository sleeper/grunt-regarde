'use strict';

//
// Observe files changes on disk as per the furnished configuration.
// The +watcherObject+ is an instance of a watcher class that have the same interface
// as Gaze. This is used only for driving easily the tests
//
var Regarde = module.exports = function (grunt, watcherObject) {
  var watcher = watcherObject;

  if (! watcher) {
    var Gaze = require('gaze').Gaze;
    watcher = new Gaze();
  }

  watcher.on('changed', function (filepath) {
    grunt.event.emit('regarde:file:changed', filepath);
  })
};
