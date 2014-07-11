window.optly.mrkt.faq = {};

window.optly.mrkt.faq.accordion = function() {
  /* Click handlers for accordion */

  var question    = $('.accordion').find('a.question'),
      answer      = $('.accordion').find('.answer'),
      expandAll   = $('.expand-all'),
      collapseAll = $('.collapse-all');

  $(question).click(function(event) {
    event.preventDefault();

    $(this).toggleClass('open').siblings().toggleClass('open');
  });

  $(expandAll).click(function(event){
    event.preventDefault();

    $(question).addClass('open');
    $(answer).addClass('open');
  });

  $(collapseAll).click(function(event){
    event.preventDefault();

    $(question).removeClass('open');
    $(answer).removeClass('open');
  });
};

window.optly.mrkt.faq.accordion();