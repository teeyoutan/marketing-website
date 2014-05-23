/* global google: false, console: false */
(function(){

  'use strict';

  try {

    window.mrktEng = window.mrktEng || {};

    window.mrktEng.contact = {};

    window.mrktEng.contact.showMap = function(){

      var map;

      var mapOptions = {

        center: new google.maps.LatLng(-34.397, 150.644),

        zoom: 8

      };

      map = new google.maps.Map(document.getElementById('map'), mapOptions);

    };

  } catch(error) {

    console.log('1');

  }

})(jQuery);
