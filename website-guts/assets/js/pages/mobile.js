function animShowSlide($parent, last) {
  if($parent.offset().top <= $(document).scrollTop() + window.innerHeight * 0.6 ) {
    $parent.children('.container').addClass('enter');
    if (last) {
      $(window).off('load scroll');
    }
  } 
}

$(function() {
  var _gaq                 = window._gaq || [],
    $textDisplay           = $('#visual-change-button'),
    $textInput             = $('#visual-change-input'),
    animParents            = [$('#flexible-powerful'), $('#trusted')],
    $buttonCont            = $('#visual-change-button'),
    $visualChangePhoto     = $('#visual-change-photo'),
    $flexiblePowerfulPhone = $('#flexible-powerful .container'),
    $deployCont            = $('#deploy-graphic-cont'),
    queryString            = document.location.search,
    urlParams              = queryString.substr(1, queryString.length),
    fullUrl                = $('.sign-up-btn').attr('href') + '&' + urlParams;

  //this is potentially antiquated, assuming it has to do with animations
  $('body').addClass('loaded');

  //video is currently commented out but leaving this tracking 
  // $('#video').on('click', function() {
  //   _gaq.push(['_trackEvent', 'Mobile landing page', 'Video click']);
  // });

  //create the parallax panel entry animation
  if ( !window.optly.mrkt.isMobile() ) {
    $(window).on('load scroll', function() {
      $.each(animParents, function(index, $elm) {
        if(index === animParents.length - 1) {
          animShowSlide($elm, true);
        } else {
          animShowSlide($elm);
        }
      });
    });
  }

  //track text input for the iphone button interaction
  $textInput.keyup(function() {
    $textDisplay.text($textInput.val());
    _gaq.push(['_trackEvent', 'Mobile landing page', 'text change']);
  });
  
  //track color change for iphon button interaction
  $('#visual-change-color').on('click', '.color-btn', function(e) {
    var color = $(e.target).attr('id').replace('visual-change-', '');
    $buttonCont.removeAttr('class').addClass(color);
    _gaq.push(['_trackEvent', 'Mobile landing page', 'color change', color]);
    e.preventDefault();
  });

  //track slider interaction
  $('.visual-slider-cont').on('click', function() {
    var slider = $(this).attr('id');
    if ($(this).hasClass('a')) {
      $(this).removeClass('a').addClass('b');
      if (slider === 'visual-change-slider') {
        $visualChangePhoto.removeClass('a').addClass('b');
        _gaq.push(['_trackEvent', 'Mobile landing page', 'slider click', 'visual change', 'b']);
      } else {
        $flexiblePowerfulPhone.removeClass('a').addClass('b');
        _gaq.push(['_trackEvent', 'Mobile landing page', 'slider click', 'flexible powerful', 'b']);
      }
    } else {
      $(this).removeClass('b').addClass('a');
      if (slider === 'visual-change-slider') {
        $visualChangePhoto.removeClass('b').addClass('a');
        _gaq.push(['_trackEvent', 'Mobile landing page', 'slider click', 'visual change', 'a']);
      } else {
        $flexiblePowerfulPhone.removeClass('b').addClass('a');
        _gaq.push(['_trackEvent', 'Mobile landing page', 'slider click', 'flexible powerful', 'a']);
      }
    }
  });
  
  //track deploy button interaction
  $('#deploy-btn').on('click', function(e) {
    e.preventDefault();
    if (!$deployCont.hasClass('deployed')) {
      $deployCont.addClass('deployed');
      _gaq.push(['_trackEvent', 'Mobile landing page', 'deploy click']);
    }
  });

  //analytics.track
  //
  // analytics.track('slider click', {
  //   category: 'Mobile landing page',
  //   label: 'visual change',
  //   value: 'b'
  // });

  //add url parameter to the sign up button
  $('.sign-up-btn').attr('href', fullUrl);

});
