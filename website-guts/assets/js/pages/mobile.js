var INBOUND_LEAD_FORM_TYPE = 'Mobile Launch Notification Request',
  urlParams                = document.location.search,
  emailRegex               = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    fullUrl                = $('.sign-up-btn').attr('href') + '&' + urlParams;


  $('body').addClass('loaded');
  // $('#video').magnificPopup({
  //   type: 'iframe'
  // });
  $('#video').on('click', function() {
    _gaq.push(['_trackEvent', 'Mobile landing page', 'Video click']);
  });

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

  $textInput.keyup(function() {
    $textDisplay.text($textInput.val());
    _gaq.push(['_trackEvent', 'Mobile landing page', 'text change']);
  });
  
  $('#visual-change-color').on('click', '.color-btn', function(e) {
    var color = $(e.target).attr('id').replace('visual-change-', '');
    $buttonCont.removeAttr('class').addClass(color);
    _gaq.push(['_trackEvent', 'Mobile landing page', 'color change', color]);
    e.preventDefault();
  });
  /* sliders */
  
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
  
  $('#deploy-btn').on('click', function(e) {
    e.preventDefault();
    if (!$deployCont.hasClass('deployed')) {
      $deployCont.addClass('deployed');
      _gaq.push(['_trackEvent', 'Mobile landing page', 'deploy click']);
    }
  });


  //add url parameter to the sign up button
  urlParams = urlParams.substr(1, urlParams.length);
  $('.sign-up-btn').attr('href', fullUrl);

  
  $('.signup-ios').submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    var form = $(this);
    if (emailRegex.test(data[0].value)) {
      data.push({
        name: 'hidden',
        value: 'touched'
      });
      data.push({
        name: 'status',
        value: 'sending'
      });
      $.ajax({
        type: 'POST',
        url: '/mobile/notify_me',
        data: data,
        dataType: 'json'
      }).always(function(response, textStatus, xhrObject) {
        if (xhrObject.status === 200) {
          form.parent().addClass('signup-success').removeClass('signup-server-error').removeClass('signup-validation-error');
          var token = response.token;
          var leadInfo = {
            'Email': data[0].value,
            'Inbound_Lead_Form_Type__c': INBOUND_LEAD_FORM_TYPE,
            'requestedMobileLaunchNotification': true
          };
          window.mktoMunchkinFunction(
            'associateLead',
            leadInfo,
            token
          );
          window.location = 'http://pages.optimizely.com/ios-beta-access.html';
        } else {
          form.parent().addClass('signup-server-error').removeClass('signup-validation-error');
        }
      });
    } else {
      $(this).parent().addClass('signup-validation-error');
    }
    return false;
  });

});
