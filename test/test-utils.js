'use strict';
var assert = require('assert');
var utils = require('../lib/utils');

describe('Utils', function (){
  describe('utils.checkConfig', function () {
    it('should check each of the target has a correct config', function () {
      var config = {html: {}};

      assert.throws( function () {
        utils.checkConfig(config);
      },
      /Invalid config for target html: files is missing/);

      config = {fred: { files: 3 }};

      assert.throws( function () {
        utils.checkConfig(config);
      },
      /Invalid config for target fred: files is neither a string nor an Array of patterns/);

      config = {fred: { files: '*.txt', tasks: 3 }};

      assert.throws( function () {
        utils.checkConfig(config);
      },
      /Invalid config for target fred: tasks is neither a string nor an Array of patterns/);

    });

    it('should filter tasks to keep only strings and arrays');
  });
});