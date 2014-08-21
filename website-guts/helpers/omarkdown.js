var marked = require('optimizely-marked');
module.exports.register = function (Handlebars)  {
  Handlebars.registerHelper('omarkdown', function (options)  {
    debugger;
    marked.setOptions({
      linkPath: options.hash.path
    });
    return marked(options.fn(this));
  });
};
