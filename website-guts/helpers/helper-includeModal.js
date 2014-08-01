var fs = require('fs');
module.exports.register = function (Handlebars, options, params)  {
  Handlebars.registerHelper('includeModals', function (modals)  {
    //return modals instanceof Array;
    //return __dirname;
    if(modals instanceof Array){
      var i, content, loops;
      content = '';
      for(i = 0; i < modals.length; i++){
        content+= fs.readFileSync(__dirname + '/../templates/partials/' + modals[i] + '.hbs', {encoding: 'utf-8'});
      }
      return new Handlebars.SafeString(content);
    }
  });
};
