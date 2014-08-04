var $utilityNavElm = $('.utility-nav.signed-in-content');
var $dropdownMenus = $('[data-show-dropdown]');

function templateExpData($elm, expData) {
  var $expLink = $( $elm.find('.edit') );
  $expLink.attr('href', 'https://www.optimizely.com/edit?experiment_id=' + expData.id);
  if (!expData.can_edit) {
    $expLink.addClass('disabled');
    $expLink.bind('click', function(e) {
      e.preventDefault();
    });
  }
  $elm.find('.experiment-description').text(expData.description);
  if (expData.has_started) {
    $elm.find('.experiment-results').css({display: 'block'});
  }
}

function showUtilityNav($elm, acctData, expData) {
  $('body').addClass('signed-in');
  $('body').removeClass('signed-out');
  $elm.find('.customer-email').text(acctData.email);

  var $expContainer = $elm.find('span.experiment-container');

  $.each(expData.experiments, function(index, data) {
    if (index === 0) {
      templateExpData($expContainer, data);
      $expContainer.attr('id', 'exp-cont-' + (index + 1) );
    }
    else {
      var $cloned = $expContainer.clone();
      $cloned.attr('id', 'exp-cont-' + (index + 1) );
      //var $allExpElms = $('span.experiment-container');
      templateExpData($cloned, data);
      $cloned.insertAfter( $('#exp-cont-' + index) );
    }
  });
  $elm.find('#view-all-experiments-link').attr('href', 'https://www.optimizely.com/dashboard?project_id=' + acctData.account_id);
}

function bindDropdownClick($dropdownMenus) {
  $('.utility-nav.signed-in-content').delegate('[data-dropdown]', 'click', function(e) {
    e.preventDefault();
    var clickedData = $(this).data('dropdown');
    $.each($dropdownMenus, function(index, elm) {
      var $elm = $(elm);
      if ( $elm.data('show-dropdown') ===  clickedData ) {
        $elm.css({display: 'block'});
        $elm.mouseleave( function() {
          $(this).css({display: 'none'});
        });
      } else {
        $elm.css({display: 'none'});
      }
    });
  });
}

bindDropdownClick($dropdownMenus);
window.optly_q.push([showUtilityNav, $utilityNavElm, 'acctData', 'expData']);