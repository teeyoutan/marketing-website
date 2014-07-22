module.exports.register = function (Handlebars, options, params)  { 
  Handlebars.registerHelper('classgridfinish', function (index, last, options)  { 
    if ( (index + 1) % 3 === 0 ) {
      return options.fn(this);
    } 
    else if (last) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
};