'use strict';

var validType = function validType(v) {
//   return ((typeof v !== 'string') &&
//         !(v instanceof String) &&
//         !(v instanceof Array));
  return (v === undefined ||
    v instanceof String ||
    typeof v === 'string' ||
    Array.isArray(v));
};

var filterElem = function filterElem(a) {
  if (a) {
    return a.filter(function (t) { return typeof t === 'string'; });
  } else {
    return a;
  }
};

var utils = module.exports;

utils.checkConfig = function checkConfig(cfg) {
  var config = cfg;

  Object.keys(config).forEach(function (target) {
    var targetCfg = config[target];

    if (!targetCfg.files) {
      throw new Error('Invalid config for target ' + target + ': files is missing');
    }

    ['files', 'tasks'].forEach(function (v) {
      if (!validType(targetCfg[v])) {
        throw new Error('Invalid config for target ' + target + ': ' + v + ' is neither a string nor an Array of patterns');
      }
      if (typeof targetCfg[v] === 'string') {
        targetCfg[v] = [targetCfg[v]];
      }
      targetCfg[v] = filterElem(targetCfg[v]);
    });
  });

  return config;
};

utils.launchTask = function launchTask(grunt, tasks, spawn) {
  var nameArgs = grunt.task.current.nameArgs;

// if(grunt.task.current.nameArgs !== nameArgs){
//    // previous task hasn't finished so skipping
//   grunt.log.warn('A task is already running, queuing...');
// }

  try {
    // run target tasks
    grunt.task.run(tasks).mark();
  } catch (err) {
    grunt.log.error(err);
  };
  // // Enqueue the watch task, so that it loops.
  // grunt.task.run(nameArgs).mark();
};

