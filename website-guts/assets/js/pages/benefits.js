window.optly.mrkt.benefits = {};

window.optly.mrkt.benefits.menu = function() {

  $('body').delegate('.for-menu', 'click', function(event) {
    event.stopPropagation();
    $(this).toggleClass('shown');
  });

  /* Close menu when clicking away */
  $('html').click(function(event) {
    event.preventDefault();
    $('.for-menu').removeClass('shown');
  });

};

/* initialize menu */
window.optly.mrkt.benefits.menu();
