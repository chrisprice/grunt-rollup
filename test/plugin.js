'use strict';

module.exports = function plugin() {
  var counter = 0;

  return {
    banner: function() {
      counter += 1;
      return '// ' + counter;
    }
  };
};
