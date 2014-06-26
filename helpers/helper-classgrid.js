// module.exports = require('./lib/helper-lib');

module.exports.register = function (Handlebars, options, params)  { 
  Handlebars.registerHelper('classgrid', function (index, options)  { 
    gridclass: function (index, options) {
    if (index === 0 || index % 4 === 0) {
        return options.fn(this);
      }
    return options.inverse(this);
  };
};