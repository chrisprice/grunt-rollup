'use strict';

var grunt = require('grunt');

function assertFilesSame(test, actual, expected, msg) {
  var actualContents = grunt.file.read(actual);
  var expectedContents = grunt.file.read(expected);

  test.equal(actualContents, expectedContents, msg);
}

exports.rollup = {
  default_options: function(test) {
    test.expect(1);

    assertFilesSame(test, 'tmp/default_options.js',
      'test/expected/default_options.js',
      'should describe what the default behavior is.');

    test.done();
  // },
  // source_map: function(test) {
  //   test.expect(2);

  //   assertFilesSame(test, 'tmp/source_map.js',
  //     'test/expected/source_map.js',
  //     'should describe behaviour with sourcemap and banner/footer.');

  //   assertFilesSame(test, 'tmp/source_map.js.map',
  //     'test/expected/source_map.js.map',
  //     'should write a map file.');

  //   test.done();
  // },
  // source_map_inline: function(test) {
  //   test.expect(1);

  //   assertFilesSame(test, 'tmp/source_map_inline.js',
  //     'test/expected/source_map_inline.js',
  //     'should describe behaviour with sourcemap inline.');

  //   test.done();
  }
};
