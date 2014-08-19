module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('notEqual', function(lvalue, rvalue, options) {
      if (arguments.length < 3) {
        throw new Error('Handlebars Helper notEqual needs 2 parameters');
      }
      if( lvalue === rvalue ) {
          return options.inverse(this);
      } else {
          return options.fn(this);
      }
  });
};
