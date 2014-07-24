(function($){ 

  window.optly = window.optly || {}; 

  window.optly.mrkt = window.optly.mrkt || {}; 

$('#seo-form').oForm({

  afterLocal: function(response, callback){

    var runCallback, success, resp, parseResponseText;

    runCallback = function(){

      if(typeof callback === 'function'){

        callback();

      }

    };

    success = function(){

      var name, email, path;

      name = $('#name').val();

      email = $('#email').val();

      path = window.location.pathname;

      //add reporting

      window.analytics.identify( email, {

        name: name,

        email: email

      },{

        Marketo: true

      });

      window.analytics.track('/account/create/success', {

        category: 'Accounts',

        label: path

      },{

        Marketo: true

      });

      window.analytics.track('/free-trial/success', {

        category: 'Free trial',

        label: path

      },{

        Marketo: true

      });

      setTimeout(function(){

        runCallback();

        window.location = 'https://www.optimizely.com/edit?url=' + $('#url').val();

      }, 2000);

    };

    parseResponseText = function(){

      try{

        resp = $.parseJSON(response.responseText);

      } catch (error){

        //report json parsing error
        //add return

      }

    };

    if(typeof response === 'object'){

      if(response.status === 200){

        parseResponseText();

        if(typeof resp === 'object'){

          if(resp.succeeded === true){

            success();

          } else {

            //resp.succeeded was not true

            console.log('');

          }

        }

      } else {

        //response code was not 200

        console.log('failure from the api - local function');

        runCallback();

      }

    } else {

      //validation error
      runCallback();

    }

  }

});
})(jQuery);