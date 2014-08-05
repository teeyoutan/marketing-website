window.optly = window.optly || {};
window.optly.mrkt = window.optly.mrkt || {};
window.optly.mrkt.filter = {};
var $dropdownElems = $('.dropdown-cont');

// FUNCTIONS
window.optly.mrkt.filter = {

  binder: function() {

    $dropdownElems.on('click', function() {
      var $self = $(this);
      $dropdownElems.not( $self ).removeClass( 'active' );
      $self.toggleClass( 'active' );
    });

  },

  init: function() {
    this.binder();
  }

};

window.optly.mrkt.filter.init();
