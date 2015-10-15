/*
 * grunt-rollup
 * https://github.com/chrisprice/grunt-rollup
 *
 * Copyright (c) 2015 Chris Price
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    rollup: {
      default_options: {
        options: {},
        files: {
          'tmp/default_options.js': ['test/fixtures/entry.js']
        }
      // },
      // sourceMap: {
      //   options: {
      //     sourceMap: true,
      //     sourceMapRelativePaths: true,
      //     banner: '// Top',
      //     footer: '// Bottom'
      //   },
      //   files: {
      //     'tmp/source_map.js': ['test/fixtures/entry.js']
      //   }
      // },
      // sourceMapInline: {
      //   options: {
      //     sourceMap: 'inline',
      //     sourceMapFile: path.resolve('tmp/source_map_inline.js'),
      //   },
      //   files: {
      //     'tmp/source_map_inline.js': ['test/fixtures/entry.js']
      //   }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'rollup', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
