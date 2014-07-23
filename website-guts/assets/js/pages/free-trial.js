$('form :input').each(function(index, elem) {

    var eId = $(elem).attr('id');

    var label = null;

    if (eId && (label = $(elem).parents('form').find('label[for='+eId+']')).length === 1) {

        $(elem).attr('placeholder', $(label).html());

        $(label).addClass('hide-label');

    }

});

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

            //add reporting

            window.analytics.identify('USER ID', {

              name: $('#name').val(),

              email: $('#email').val()

            },{

              Marketo: true

            }).track('/account/create/success', {

              category: 'Accounts',

              label: window.location.pathname

            },{

              Marketo: true

            }).track('/free-trial/success', {

              category: 'Free trial',

              label: window.location.pathname

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
