'use strict';
var assert = require('assert');
var utils = require('../lib/utils');

describe('Utils', function () {
  describe('utils.checkConfig', function () {

    it('should allow to have no task', function () {
      var config = {html: {files: '*.txt' }};

      assert.doesNotThrow(function () {
        utils.checkConfig(config);
      });
    });

    it('should check each of the target has a correct config', function () {
      var config = {html: {}};

      assert.throws(function () {
        utils.checkConfig(config);
      },
      /Invalid config for target html: files is missing/);

      config = {fred: { files: 3 }};

      assert.throws(function () {
        utils.checkConfig(config);
      },
      /Invalid config for target fred: files is neither a string nor an Array of patterns/);

      config = {fred: { files: '*.txt', tasks: 3 }};

      assert.throws(function () {
        utils.checkConfig(config);
      },
      /Invalid config for target fred: tasks is neither a string nor an Array of patterns/);
    });

    it('should filter tasks to keep only strings and arrays', function () {
      var config = {html: { files: '*.txt', tasks: ['foo', 1, 'bar']}};

      config = utils.checkConfig(config);
      assert.equal(config.html.tasks.length, 2);
      assert.equal(config.html.tasks[0], 'foo');
      assert.equal(config.html.tasks[1], 'bar');
    });

    it('should filter files to keep only strings and arrays', function () {
      var config = {html: { files: ['*.txt', 1, '*.html']}};

      config = utils.checkConfig(config);
      assert.equal(config.html.files.length, 2);
      assert.equal(config.html.files[0], '*.txt');
      assert.equal(config.html.files[1], '*.html');

      config = {html: { files: '*.txt'}};

      config = utils.checkConfig(config);
      assert.equal(config.html.files.length, 1);
      assert.equal(config.html.files[0], '*.txt');

    });
  });

  describe('launchTask', function () {
    it('should run all the tasks', function () {
      var _tasks;
      var task = { mark: function () {}};
      var grunt = { task: {
        run: function (t) { _tasks = t; return task; },
        current: { nameArgs: 'foo:bar' }
      }
      };
      var myTasks = ['foo', 'bar', 'baz'];

      utils.launchTask(grunt, myTasks, false);
      assert.equal(_tasks.length, 3);
      myTasks.forEach(function (t, i) {
        assert.equal(_tasks[i], t);
      });

    });

    it('should spawn the tasks when needed', function () {
      var _spawned = 0;
      var task = { mark: function () {}};
      var grunt = { task: {
        run: function (t) { _tasks = t; return task; },
        current: { nameArgs: 'foo:bar' }
      },
      util:
      {spawn: function (cfg) {
        _spawned += 1;
        // In the test we're launched by node. hHence process.argv[0] === 'node'
        assert.equal(cfg.cmd, "node");
        assert.equal(cfg.opts, {cmd: __dirname});
        // FIXME: Check the the args is containing our tasks + any command line option passed to the current process
        assert.equal(1,2);
      }}
      };
      var myTasks = ['foo', 'bar', 'baz'];

      utils.launchTask(grunt, myTasks, true);
      assert.equal(_spawned, 1);
      // myTasks.forEach(function (t, i) {
      //   assert.equal(_tasks[i], t);
      // });

    });



    it('should prevent a task from blowing up the process', function () {
      var _error;
      var task = { mark: function () {}};
      var errorMsg = 'Error from task !';
      var grunt = { task: {
        run: function (t) { throw(errorMsg); },
        current: { nameArgs: 'foo:bar' }
      },
      log: {
        error: function (err) { _error = err; }
      }
      };
      var myTasks = ['foo'];

      assert.doesNotThrow(
        function () {
        utils.launchTask(grunt, myTasks, false);
        }
      );
      assert.equal(_error, errorMsg);
    });
  });

});