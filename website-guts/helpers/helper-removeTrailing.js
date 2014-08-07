module.exports.register = function (Handlebars)  {
  Handlebars.registerHelper('eachNoTrailing', function (context, trailingIdentifier, options)  {
    var compiled,
        i,
        j;
    compiled = '';
    trailingIdentifier = new RegExp(trailingIdentifier + '+$');
    for(i = 0, j = context.length; i<j; i++) {
      compiled = compiled + options.fn(context[i]);
    }
    return compiled.replace(trailingIdentifier, '');
  });
};
