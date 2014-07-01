(function($){ 

  window.optly = window.optly || {}; 

  window.optly.mrkt = window.optly.mrkt || {}; 

window.optly.mrktEng.index.testItOut = function(editURL){

  //send user to the editor
  window.location = 'https://www.optimizely.com/edit?url=' + editURL;

};

$('input[type="text"]').focus();

$('form').submit(function(e){

  var inputVal = $('input[type="text"]').val();

  if( inputVal ){

      window.optly.mrktEng.index.testItOut( inputVal );

  } else {

    $('input[type="text"]').focus();

    //report to ga that the form was submitted without a value
    console.log('');

  }

  e.preventDefault();

});
})(jQuery);