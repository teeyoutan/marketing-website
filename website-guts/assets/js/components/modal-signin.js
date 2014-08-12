var $signinModal = $('[data-optly-modal="signin"]');

function requestSignin(e) {
  e.preventDefault();

  var deferred = window.optly.mrkt.services.xhr.makeRequest({
    type: 'POST',
    url: '/account/signin'
  });


  deferred.then(function(data) {
    if (data.success === 'true') {
      if(sessionStorage !== undefined) {
        sessionStorage.modalType = '';
      }
      window.location = 'https://www.optimizely.com/dashboard';
    }
  });

}

$signinModal.delegate('[data-modal-btn="signin"]', 'click', requestSignin);
