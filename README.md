# grunt-contrib-regarde [![Build Status](https://secure.travis-ci.org/yeoman/grunt-contrib-regarde.png?branch=master)](http://travis-ci.org/yeoman/grunt-contrib-regarde)

> Observe files for changes and take described action.


## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-contrib-regarde --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md

## The regarde task

### Overview

Add a `regarde` section in your `Gruntfile.js` to list the files to observe as well as the task to fire when one of these files change.

### Settings

#### files
Type: `String|Array`

This lists patterns describing files to observe. This can be either a string or an array.

#### tasks
Type: `String|Array`

Defines the tasks to run when an observed file change. Note that this is optional (in case it is missing, an implicit `events: true` will be inserted in the configuration)

#### spawn
Type: `boolean`
Default: false

Whether or not the tasks will be launched in a spawned subprocess. Note that in this case, the spawned task has no information on which file changed.

#### events
Type: `boolean`
Default: false

Whether or not `regarde` should send out events each time a file chnage.
If this option is `true`, `regarde` will launch the following events:
* `file:changed`
* `file:deleted`
* `file:added`

with the name of the file in parameter.

### Examples
```js
grunt.initConfig({
  regarde: {
    js: {
      files: '**/*.js',
      tasks: ['jshint'],
      spawn: true
    },
    css: {
      files: '**/*.scss',
      events: true
    }
  }
});
```

