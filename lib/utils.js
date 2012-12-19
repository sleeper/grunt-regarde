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

    if (checkType(target_cfg.files)) {
      throw new Error("Invalid config for target " + target + ": files is neither a string nor an Array of patterns");
    }

    if (checkType(target_cfg.tasks)) {
      throw new Error("Invalid config for target " + target + ": tasks is neither a string nor an Array of patterns");
    }
  });

};