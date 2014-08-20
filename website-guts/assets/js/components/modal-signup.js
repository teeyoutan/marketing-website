var $signupModal = $('[data-optly-modal="signup"]');

$signupModal.oForm({
  url: '/account',
  validation: {
    password1: function(data) {
      
    },
    password2: function(data) {

    }
  },
  beforeSubmit: function() {

  },
  afterLocal: function(jqXHR, globalCallback) {

  }
});