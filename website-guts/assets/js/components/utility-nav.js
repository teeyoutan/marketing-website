var $utilityNavElm = $('.utility-nav.signed-in-content');
var lastDropdown;

// function templateExpData($elm, expData) {
//   var $expLink = $( $elm.find('.edit') );
//   $expLink.attr('href', 'https://www.optimizely.com/edit?experiment_id=' + expData.id);
//   if (!expData.can_edit) {
//     $expLink.addClass('disabled');
//     $expLink.bind('click', function(e) {
//       e.preventDefault();
//     });
//   }
//   $elm.find('.experiment-description').text(expData.description);
//   if (expData.has_started) {
//     $elm.find('.experiment-results').css({display: 'block'});
//   }
// }

function showUtilityNav($elm, acctData, expData) {
  var handlebarsData = {
    account_data: acctData.account_id, 
    email: acctData.email,
    experiments: expData.experiments
  };

  handlebarsData.experiments[4].has_started = false;
  handlebarsData.experiments[4].description = 'aasdfasd asd fasd fasdf asd fasdf asd fasd fasd f';

  $('body').addClass('signed-in').removeClass('signed-out');

  $('#signed-in-utility').html( window.optly.mrkt.templates.experimentsNav(handlebarsData) );
  var $dropdownMenus = $('[data-show-dropdown]');

  bindDropdownClick($dropdownMenus);
}

function bindDropdownClick($dropdownMenus) {
  $('#signed-in-utility').delegate('[data-dropdown]', 'click', function(e) {
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
        $(document).bind('click', closeDropdown);
      }
    });
  });
}

function closeDropdown(e) {
  // $dropdownMenus.bind('click', function(e) {
  //   debugger;
  //   if ( !$(this).find(e.target) && e.target !== this) {
  //     $(this).removeClass('show-dropdown');
  //   } 
  // });
debugger;
  if (!$(e.target).closest('[data-show-dropdown]').length && !$(e.target).is('[data-dropdown]')) {
    $('[data-show-dropdown]').removeClass('show-dropdown');
    $(document).unbind('click', closeDropdown);
  }
}

window.optly_q.push([showUtilityNav, $utilityNavElm, 'acctData', 'expData']);