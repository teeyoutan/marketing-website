/**
 * Handlebars Path Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';

// Local utils
var Utils = require('../utils/utils');


// The module to be exported
var helpers = {
  /**
   * {{debug}}
   * Use console.log to return context of the 'this' and options from Handlebars
   * @param {Object} value
   * @example
   *   {{debug}}
   */
  debug: function (value) {
    console.log('=================================');
    console.log('Context: ', this);
    if (!Utils.isUndefined(value)) {
      console.log('Value: ', value);
    }
    return console.log('=================================');
  },

  log: function (value) {
    return console.log(value);
  }
};


// Export helpers
module.exports.register = function (Handlebars, options) {
  options = options || {};
  for (var helper in helpers) {
    if (helpers.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, helpers[helper]);
    }
  }
};
