$('#seo-form').oForm({

  afterLocal: function(response, callback){

    var runCallback, success;

    runCallback = function(arg){

      if(typeof callback === 'function'){

        callback(arg);

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

        runCallback(response);

        window.location = 'https://www.optimizely.com/edit?url=' + $('#url').val();

      }, 2000);

    };

    console.log('outside function');

    console.log(response);

    if(typeof response === 'object' && typeof response.responseJSON === 'object' && response.responseJSON.succeeded){

        console.log('inside function');

        success();

    } else {

      runCallback(response);

    }

  }

});
