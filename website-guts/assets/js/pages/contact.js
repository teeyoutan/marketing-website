/* global google: false */
window.optly.mrkt.contact.showMap = function(){

  var map;

  var mapOptions = {

    center: new google.maps.LatLng(-34.397, 150.644),

    zoom: 8

  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

};
