'use strict';

var checkType = function checkType(v) {
  return ((typeof v != 'string') &&
        !(v instanceof String) &&
        !(v instanceof Array));
};

var utils = module.exports;

utils.checkConfig = function checkConfig(cfg) {
  var config = cfg;

  Object.keys(config).forEach(function (target) {
    var target_cfg = config[target];

    if (!target_cfg.files) {
      throw new Error("Invalid config for target " + target + ": files is missing");
    }

    ['files', 'tasks'].forEach(function (v) {
      if (checkType(target_cfg[v])) {
        throw new Error("Invalid config for target " + target + ": " + v + " is neither a string nor an Array of patterns");
      }
    });

  });

};