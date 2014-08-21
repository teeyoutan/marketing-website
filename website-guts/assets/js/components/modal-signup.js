var $signupModal = $('[data-optly-modal="signup"]'),
  $password1     = $signupModal.find('input[data-validation="password1"]'),
  $password2     = $signupModal.find('input[data-validation="password2"]'),
  $hiddenInput   = $signupModal.find('input[name="hidden"]'),
  passed         = false;

$('#signup-form').oForm({
  validation: {
    password1: function(data) {
      if(data.length >= 8 && passed) {
        return true;
      }
      return false;
    },
    password2: function(data) {
      if(data.length >= 8 && $password1.val() === $password2.val() && passed) {
        return true;
      }
      return false;
    }
  },
  beforeSubmit: function() {
    var userData = {
      name: $signupModal.find('input[name="name"]').val(),
      email: $signupModal.find('input[name="email"]').val(),
      password1: window.optly.mrkt.utils.sha1Hash( $password1.val() ),
      password2: window.optly.mrkt.utils.sha1Hash( $password2.val() ),
      phone_number: $signupModal.find('input[name="phone_number"]').val(),
      'terms-of-service': $signupModal.find('input[name="terms-of-service"]').val(),
      hidden: $hiddenInput.val()
    };

    userData = window.optly.mrkt.utils.Base64.encode( JSON.stringify(userData) );
    console.log(userData);
    
    return userData;
  },
  afterLocal: function(jqXHR, globalCallback) {
    jqXHR.then(function(data) {
      if(data.success === 'true') {
        //get data here an reload to the dashboard
        console.log(data);
      }
    });
  }
});

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

function addErrors($inputElm, $errorElm, errMsg) {
  $('body').not('.error-state').addClass('error-state');
  $inputElm.not('.error-show').addClass('error-show');
  if(errMsg) {
    $('.password2-related')
      .removeClass('error-hide')
      .addClass('error-show')
      .text(errMsg);
  } else {
    $errorElm.not('.error-show').addClass('error-show');
  }
  passed = false;
}

function passwordConfirm() {
  //if the confirmation password is not present
  if( !$password2.val() ) {
    addErrors($password2, $('.password2-related'), 'This field is required');
  } 
  //if the confirmation password is not equal to the original password
  else if ( $password1.val() !== $password2.val() ) {
    addErrors($password2, $('.password2-related'), 'Please enter the same value again');
  } 
  //remove local error classes but do not remove body error class just in case
  else {
    $password2.removeClass('error-show');
    $('.password2-related').removeClass('error-show').addClass('error-hide');
    passed = true;
  }
}

$(function() {
  // for bots???
  $hiddenInput.val('touched');

  // password1 validations
  $password1.on('keyup', function() {
    //if the complex password doesn't pass apply error classes
    if( !checkComplexPassword($password1.val()) ) {
      addErrors($password1, $('h5.password-req'));
    } 
    //remove local error classes but do not remove body error class just in case
    else {
      $password1.removeClass('error-show');
      $('h5.password-req').removeClass('error-show');
      passed = true;
    }
  });

  //password2 confirmation
  $password2.one('focusout', function() {
    passwordConfirm();
    $password2.on('keyup', passwordConfirm);
  });
});

