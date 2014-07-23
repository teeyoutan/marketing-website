(function($){ 

  window.optly = window.optly || {}; 

  window.optly.mrkt = window.optly.mrkt || {}; 

$('#seo-form').oForm({

  before: function(){

    $('body').toggleClass('processing');

  },

  after: function(response){

    if(response.status === 200){

        var resp;

        try{

          resp = $.parseJSON(response.responseText);

        } catch (error){

          //report json parsing error

        }

        if(typeof resp === 'object'){

          if(resp.succeeded === true){

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
            /*
            setTimeout(function(){

              window.location = 'https://www.optimizely.com/edit?url=' + $('#url').val();

            }, 2000);
            */
          }

        }

    } else {

      //failure from the api

      $('body').toggleClass('processing');

    }

  }

});
})(jQuery);