/* global console: false */
(function($){

  'use strict';

  try {

    window.mrktEng = window.mrktEng || {};

    window.mrktEng.index = window.mrktEng.index || {};

    window.mrktEng.index.testItOut = function(editURL){

      //send user to the editor
      window.location = 'https://www.optimizely.com/edit?url=' + editURL;

    };

    $('input[type="text"]').focus();

    $('form').submit(function(e){

      var inputVal = $('input[type="text"]').val();

      if( inputVal ){

          window.mrktEng.index.testItOut( inputVal );

      } else {

        $('input[type="text"]').focus();

        //report to ga that the form was submitted without a value
        console.log('');

      }

      e.preventDefault();

    });

  } catch(error){

    console.log('error');

  }

})(jQuery);
