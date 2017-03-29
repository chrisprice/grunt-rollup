'use strict';

var grunt = require('grunt');
var fs = require('fs');

function assertFilesSame(test, actual, expected, msg) {
  var actualContents = grunt.file.read(actual);
  var expectedContents = grunt.file.read(expected);

  test.equal(actualContents, expectedContents, msg);
}

function assertFileExists(test, file, msg) {
  test.ok(fs.existsSync(file), msg);
}

exports.rollup = {
  default_options: function(test) {
    test.expect(1);

    assertFilesSame(test, 'tmp/default_options.js',
      'test/expected/default_options.js',
      'should describe what the default behavior is.');

    test.done();
  },
  source_map: function(test) {
    test.expect(2);

    assertFilesSame(test, 'tmp/source_map.js',
      'test/expected/source_map.js',
      'should describe behaviour with sourcemap and banner/footer.');

    assertFilesSame(test, 'tmp/source_map.js.map',
      'test/expected/source_map.js.map',
      'should write a map file.');

    test.done();
  },
  source_map_inline: function(test) {
    test.expect(1);

    assertFilesSame(test, 'tmp/source_map_inline.js',
      'test/expected/source_map_inline.js',
      'should describe behaviour with sourcemap inline.');

    test.done();
  },
  plugin_array: function(test) {
    test.expect(2);

    assertFilesSame(test, 'tmp/plugin_array_1.js',
      'test/expected/plugin_array_1.js',
      'should handle an array of plugins.');

    assertFilesSame(test, 'tmp/plugin_array_2.js',
      'test/expected/plugin_array_2.js',
      'should handle an array of plugins.');

    test.done();
  },
  plugin_function: function(test) {
    test.expect(2);

    assertFilesSame(test, 'tmp/plugin_function_1.js',
      'test/expected/plugin_function_1.js',
      'should handle a plugins getter.');

    assertFilesSame(test, 'tmp/plugin_function_2.js',
      'test/expected/plugin_function_2.js',
      'should handle a plugins getter.');

    test.done();
  },
  onwarn: function(test) {
    test.expect(2);

    assertFileExists(test, 'tmp/onwarn.js',
      'should generete file normally.');

    assertFileExists(test, 'tmp/warn_intercepted',
      'should intercept warning.');

    test.done();
  }
};
