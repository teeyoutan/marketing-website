var path = require('path');
var plasma = require('plasma');
var _ = require('lodash');

module.exports.register = function (Handlebars, opts, params) {
  console.log('registering helper');
  Handlebars.registerHelper('local-data', function (options) {
    var filepath = path.join(path.dirname(this.page.src), '*.{json,yml,yaml}');
    var data = {
      localData: plasma.load(filepath).data
    };
    this.page = _.extend({}, this.page, data);
    return options.fn(this);
  });
};