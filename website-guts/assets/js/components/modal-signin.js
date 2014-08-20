var $signinModal = $('[data-optly-modal="signin"]');

$signinModal.oForm({
  url: '/account/create',
  validation: {
    password: function(data) {
      if(data.length > 0) {
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
    console.log(userData);
   
    return userData;
  },
  afterLocal: function(jqXHR, globalCallback) {
    jqXHR.then(function(data) {
      //reload to dashboard if user details are confirmed
      console.log('response data: ', data);
    });
  }
});
