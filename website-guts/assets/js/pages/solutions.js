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

    var heights = [];
    $('.partner-grid-elm').each( function() {
      heights.push( $(this).outerHeight() );
    });
    heights = heights.sort().reverse();
    $('.partner-grid-elm').each( function() {
      $(this).height( heights[0] );
    });

    $isoContainer = $('.partner-grid').isotope({
      itemSelector: '.partner-grid-elm',
      layoutMode: 'fitRows'
    });
  },

  updateIsotope: function() {
    var $activeItems = $filterElems.filter('.active');
    var values = [];

    $activeItems.each( function() {
      var value = $(this).data( 'filter' );
      values.push( '.' + value );
    });

    var filterValue = values.join('');
    $isoContainer.isotope({ filter: filterValue });

    // enable classname debugging
    // var $output = $('#output');
    // $output.text( filterValue );

  },

  init: function() {
    this.binder();
    this.isotope();
  }

};

window.optly.mrkt.filter.init();
