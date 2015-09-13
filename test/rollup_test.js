'use strict';

var grunt = require('grunt');

exports.rollup = {
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options.js');
    var expected = grunt.file.read('test/expected/default_options.js');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  }
};
