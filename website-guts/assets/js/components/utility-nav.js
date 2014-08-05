var $utilityNavElm = $('.utility-nav.signed-in-content');
var $dropdownMenus = $('[data-show-dropdown]');
var lastDropdown;

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
  $('body').addClass('signed-in').removeClass('signed-out');
  $elm.find('.customer-email').text(acctData.email);

  var $expContainer = $elm.find('span.experiment-container');

  $.each(expData.experiments, function(index, data) {
    if (index === 0) {
      templateExpData($expContainer, data);
      $expContainer.attr('id', 'exp-cont-' + (index + 1) );
    }
    // cloning logic, will be replaced with client side handlebars templating
    else {
      var $cloned = $expContainer.clone();
      $cloned.attr('id', 'exp-cont-' + (index + 1) );
      templateExpData($cloned, data);
      $cloned.insertAfter( $('#exp-cont-' + index) );
    }
  });
  $elm.find('#view-all-experiments-link').attr('href', 'https://www.optimizely.com/dashboard?project_id=' + acctData.account_id);
}

function bindDropdownClick($dropdownMenus) {
  $('.utility-nav.signed-in-content').delegate('[data-dropdown]', 'click', function(e) {
    e.preventDefault();
    // Get the type of dropdown anchor that was clicked
    var clickedData = $(this).data('dropdown');

    // Iterate through cached dropdown containers looking for the clicked type
    $.each($dropdownMenus, function(index, elm) {
      var $elm = $(elm);
      //var $dropdownMenu = $elm.data('show-dropdown');

      // Logic to close the dropdown if it is open and another is clicked
      if (clickedData !== lastDropdown && lastDropdown !== undefined) {
        $('[data-show-dropdown="' + lastDropdown + '"]').removeClass('show-dropdown');
      }
      // Logic to open the dropdown and cache the last opened dropdown
      if ( $elm.data('show-dropdown') ===  clickedData ) {
        $elm.toggleClass('show-dropdown');
        lastDropdown = clickedData;
      }
    });
  });
}

bindDropdownClick($dropdownMenus);
window.optly_q.push([showUtilityNav, $utilityNavElm, 'acctData', 'expData']);