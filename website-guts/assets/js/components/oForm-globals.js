window.optly = window.optly || {};

window.optly.mrkt = window.optly.mrkt || {};

window.optly.mrkt.oForm = {};

window.optly.mrkt.oForm.ppcFormDefaultResponseHandler = function(resp, callback){

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

      runCallback(callback);

      window.location = 'https://www.optimizely.com/edit?url=' + $('#url').val();

    }, 2000);

  };

  if(typeof resp === 'object'){

    if(typeof resp.responseJSON === 'object'){

      if(resp.responseJSON.succeeded){

        success();

      } else if(!resp.responseJSON.succeeded){

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

  } else {

    $('body').toggleClass('processing-state');

  }

};

jQuery.oFormGlobalOverrides = {

  beforeGlobal: function(){

    $('body').toggleClass('processing-state');

  },

  reportValidationError: function(element){

      window.analytics.track( $(element).attr('name') + ' validation error', {

        category: 'form field error',

        label: window.location.pathname

      });

  }

};

window.optly.mrkt.oForm.validatePassword = function(pword){

  console.log('VALIDATE PASSWORD RUNNING');

  var checkComplexPassword = function (password) {
    var CHAR_LOWERS = /[a-z]/,
      CHAR_UPPERS   = /[A-Z]/,
      CHAR_NUMBERS  = /[0-9]/,
      CHAR_SPECIAL  = /[?=.*!@#$%^&*]/,
      CHAR_TYPES    = [CHAR_LOWERS,CHAR_UPPERS,CHAR_NUMBERS,CHAR_SPECIAL],
      counter       = 4;

    for (var i=0; i<CHAR_TYPES.length; i++){
      if(!CHAR_TYPES[i].test(password)){
        counter--;
      }
    }

    if (counter <= 1 || password.length < 8){
      return false;
    } else {
      return true;
    }
  };

  console.log('pword: ', pword);

  console.log('returns', checkComplexPassword(pword));

  return checkComplexPassword(pword);

};
