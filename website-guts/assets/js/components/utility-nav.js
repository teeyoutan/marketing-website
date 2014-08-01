var $userDataElms = $('[data-show-user-state]');

function templateExpData($elm, userData, expData) {
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

function showUtilityNav($elms) {
  var userData = window.optly.mrkt.userInfo.account;
  var expData = window.optly.mrkt.userInfo.experiments;
  $.each($elms, function(index, elm) {
    var $elm = $(elm);
    if( $elm.data('show-user-state') === 'logged-out') {
      $elm.css({display: 'none'});
    } 
    else if ( $elm.data('show-user-state') === 'logged-in' ) {
      $elm.find('.customer-email').text(userData.email);
      $elm.css({display: 'block'});
      var $expContainer = $elm.find('span.experiment-container');
      
      $.each(expData.experiments, function(index, data) {
        if (index === 0) {
          templateExpData($expContainer, userData, data);
          $expContainer.attr('id', 'exp-cont-' + (index + 1) );
        }
        else {
          var $cloned = $expContainer.clone();
          $cloned.attr('id', 'exp-cont-' + (index + 1) );
          //var $allExpElms = $('span.experiment-container');
          templateExpData($cloned, userData, data);
          $cloned.insertAfter( $('#exp-cont-' + index) );
        }
      });
      $elm.find('#view-all-experiments-link').attr('href', 'https://www.optimizely.com/dashboard?project_id=' + userData.account_id);
    }
  });
}

window.optly_q.push([showUtilityNav, $userDataElms]);