var $signinModal = $('[data-optly-modal="signin"]'),
  emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function signinOform() {
  $('#signin-form').oForm({
    validation: {
      password: function(data) {
        if(data.length >= 8) {
          return true;
        }
        return false;
      }
    },
    beforeSubmit: function() {
      var termsIsChecked = $signinModal.find('input:checkbox').is(':checked');
      var shaPwd = window.optly.mrkt.utils.sha1Hash( $signinModal.find('input:password').val() );
      var userData = {
        email: $signinModal.find('input[name="email"]').val(),
        password: shaPwd
      };
      if(termsIsChecked) {
        userData.persist = 'on';
      }

      userData = window.optly.mrkt.utils.Base64.encode( JSON.stringify(userData) );
     
      return userData;
    },
    afterLocal: function(jqXHR, globalCallback) {
      jqXHR.then(function(data) {
        //reload to dashboard if user details are confirmed
        console.log('response data: ', data);
      });
    }
  });
}

function encodeSigninData() {
  var termsIsChecked = $signinModal.find('input:checkbox').is(':checked');
  var shaPwd = window.optly.mrkt.utils.sha1Hash( $signinModal.find('input:password').val() );
  var userData = {
    email: $signinModal.find('input[name="email"]').val(),
    password: shaPwd
  };
  if(termsIsChecked) {
    userData.persist = 'on';
  }

  userData = window.optly.mrkt.utils.Base64.encode( JSON.stringify(userData) );
 
  return userData;
}

function checkComplexPassword(password) {
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
}

$(function() {
  $('#signin-form').on('submit', function(e) {
    var deferred;
    e.preventDefault();
    if ( !emailRegEx.test( $('#signin-form').find('[name="email"]').val() ) && $('#signin-form').find('[type="password"]').val().length < 8 && !checkComplexPassword( $('#signin-form').find('[type="password"]').val() )) {
      $('#signin-form').find('.password-related').removeClass('error-hide').addClass('error-show');
      $('#signin-form').find('[type="password"]').addClass('error-show');
      $('#signin-form').find('.email-related').removeClass('error-hide').addClass('error-show');
      $('#signin-form').find('[name="email"]').addClass('error-show');
      $('#signin-form').find('p.error-message').removeClass('error-hide').addClass('error-show');
      return;
    } else if( $('#signin-form').find('[type="password"]').val().length < 8 || !checkComplexPassword( $('#signin-form').find('[type="password"]').val() ) ) {
      $('#signin-form').find('.password-related').removeClass('error-hide').addClass('error-show');
      $('#signin-form').find('[type="password"]').addClass('error-show');
      $('#signin-form').find('p.error-message').removeClass('error-hide').addClass('error-show');
      return;
    } else if ( !emailRegEx.test( $('#signin-form').find('[name="email"]').val() ) ) {
      $('#signin-form').find('.email-related').removeClass('error-hide').addClass('error-show');
      $('#signin-form').find('[name="email"]').addClass('error-show');
      $('#signin-form').find('p.error-message').removeClass('error-hide').addClass('error-show');
      return;
    }
    deferred = $.ajax({
        type: 'POST',
        url: '/account/signin',
        data: {data: encodeSigninData()}
      });

    deferred.then(function(resp) {
      debugger;
      window.location = 'https://www.optimizely.com/dashboard';
    }, function(err) {
      console.log('error: ', err);
    });

  });
});