'use strict';

var validType = function validType(v) {
//   return ((typeof v !== 'string') &&
//         !(v instanceof String) &&
//         !(v instanceof Array));
  return ( v === undefined ||
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
    var target_cfg = config[target];

    if (!target_cfg.files) {
      throw new Error("Invalid config for target " + target + ": files is missing");
    }

    ['files', 'tasks'].forEach(function (v) {
      if (!validType(target_cfg[v])) {
        throw new Error("Invalid config for target " + target + ": " + v + " is neither a string nor an Array of patterns");
      }
      if (typeof target_cfg[v] === 'string') {
        target_cfg[v] = [target_cfg[v]];
      }
      target_cfg[v] = filterElem(target_cfg[v]);
    });
  });

  return config;
};