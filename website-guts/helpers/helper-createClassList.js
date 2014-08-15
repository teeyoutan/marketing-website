/**
 * Create a list of classes from a comma separated string
 * "Foo Bar, Bar Baz, Baz Quz" => "foobar barbaz bazquz"
 *
 * @param {string} str
 */
module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('createClassList', function( str ) {
    var items = str.toLowerCase().split(',');
    var classList = '';
    for (var i = 0; i < items.length; i++) {
      classList += items[i].replace(/ /g,'') + ' ';
    }
    return classList;
  });
};
