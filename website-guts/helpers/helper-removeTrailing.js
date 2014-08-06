module.exports.register = function (Handlebars, options, params)  {
  Handlebars.registerHelper('eachNoTrailing', function (context, trailingIdentifier, options)  {
    var compiled,
        trailingToRemoveRegEx,
        i,
        j;
    compiled = '';
    trailingIdentifier = new RegExp(trailingIdentifier + '+$');
    for(var i=0, j=context.length; i<j; i++) {
      compiled = compiled + options.fn(context[i]);
    }
    console.log(typeof(compiled));
    return compiled.replace(trailingIdentifier, '');
  });
};
