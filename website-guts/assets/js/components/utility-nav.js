var $utilityNavElm = $('.utility-nav.signed-in-content');
var lastDropdown;

function showUtilityNav($elm, acctData, expData) {
  var handlebarsData = {
    account_data: acctData.account_id, 
    email: acctData.email,
    experiments: expData.experiments
  };

  $('body').addClass('signed-in').removeClass('signed-out');

  $('#signed-in-utility').html( window.optly.mrkt.templates.experimentsNav(handlebarsData) );
  var $dropdownMenus = $('[data-show-dropdown]');

  bindDropdownClick($dropdownMenus);
  $('[data-logout]').on('click', signOut);
}

function bindDropdownClick($dropdownMenus) {
  $('#signed-in-utility').delegate('[data-dropdown]', 'click', function(e) {
    e.preventDefault();

    // Get the type of dropdown anchor that was clicked
    var clickedData = $(this).data('dropdown');

    // Iterate through cached dropdown containers looking for the clicked type
    $.each($dropdownMenus, function(index, elm) {
      var $elm = $(elm);
      // Logic to close the dropdown if it is open and another is clicked
      if (clickedData !== lastDropdown && lastDropdown !== undefined) {
        $('[data-show-dropdown="' + lastDropdown + '"]').removeClass('show-dropdown');
      }
      // Logic to open the dropdown and cache the last opened dropdown
      if ( $elm.data('show-dropdown') ===  clickedData ) {
        $elm.toggleClass('show-dropdown');
        lastDropdown = clickedData;
        $(document).bind('click', closeDropdown);
      }
    });
  });
}

function closeDropdown(e) {
  if (!$(e.target).closest('[data-show-dropdown]').length && !$(e.target).is('[data-dropdown]')) {
    $('[data-show-dropdown]').removeClass('show-dropdown');
    $(document).unbind('click', closeDropdown);
  } else if ($(e.target).data('logout')) {
    signOut();
    $('[data-show-dropdown]').removeClass('show-dropdown');
    $(document).unbind('click', closeDropdown);
  }
}

function signOut() {
  debugger;
  window.optly.mrkt.services.xhr.makeRequest({
    type: 'GET',
    url: '/account/signout'
  });
}

// Make call to optly Q
window.optly_q.push([showUtilityNav, $utilityNavElm, 'acctData', 'expData']);