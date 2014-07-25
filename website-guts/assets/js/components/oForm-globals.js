window.optly.mrkt.inlineFormLabels();

window.optly.mrkt.activeLinks.markActiveLinks();

jQuery.oFormGlobalOverrides = {

  beforeGlobal: function(){

    $('body').toggleClass('processing-state');

  },

  reportValidationError: function(element){

      window.analytics.track( $(element).attr('name') + ' validation error', {

        category: 'form field error',

        label: window.location.pathname

      });

  },

  afterGlobal: function(resp){

    if(typeof resp === 'object'){

      console.log(resp);

      if(typeof resp.responseJSON === 'object'){

        if(!resp.responseJSON.succeeded){

            //error from api, did not succeed, update ui

            $('.error-message').text(resp.responseJSON.error);

            $('body').addClass('error-state');

        } else {

          $('body').removeClass('error-state');

        }

      } else {

        //response contained something that wasn't json, report this

        window.analytics.track('invalid json', {

          category: 'api error',

          label: window.location.pathname

        });

      }

    }

    $('body').toggleClass('processing-state');

  }

};
