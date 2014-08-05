(function($){ 

  window.optly = window.optly || {}; 

  window.optly.mrkt = window.optly.mrkt || {}; 

var $dropdownElems = $('.dropdown-cont');
var $filterElems = $('.filter-item');
var $isoContainer;

// FUNCTIONS
window.optly.mrkt.filter = {

  binder: function() {

    var self = this;

    $dropdownElems.bind('click', function() {
      var $this = $(this);
      $dropdownElems.not( $this ).removeClass( 'active' );
      $this.toggleClass( 'active' );
    });

    $filterElems.bind('click', function(e) {
      e.stopPropagation();
      var $this = $(this);
      $this.toggleClass( 'active' );
      self.updateIsotope();
    });

  },

  isotope: function() {
    $isoContainer = $('.partner-grid').isotope({
      itemSelector: '.partner-grid-elm',
      layoutMode: 'fitRows'
    });
  },

  updateIsotope: function() {
    var $output = $('#output');
    var $activeItems = $filterElems.filter('.active');
    var values = [];

    $activeItems.each( function() {
      var value = $(this).data( 'filter' );
      values.push( '.' + value );
    });

    var filterValue = values.join(', ');
    $output.text( filterValue );
    $isoContainer.isotope({ filter: filterValue });

  },

  init: function() {
    this.binder();
    this.isotope();
  }

};

window.optly.mrkt.filter.init();
})(jQuery);