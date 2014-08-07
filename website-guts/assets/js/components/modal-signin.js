var $signinModal = $('[data-optly-modal="signin"]');

function requestSignin(e) {
  e.preventDefault();
  alert('singin fired');
  var deferred = window.optly.mrkt.services.xhr.makeRequest({
    type: 'POST',
    url: '/account/signin'
  });
  

  deferred.then(function(data) {
    if (data.success === 'true') {
      alert('response data: ' + data.success);
      if(sessionStorage !== undefined) {
        sessionStorage.modalType = '';
      }
      window.location = 'https://www.optimizely.com/dashboard';
    }
  }, function(err) {
    alert('response error: ', err)  
    console.log('singin error: ' + err);
  });

}

$signinModal.delegate('[data-modal-btn="signin"]', 'click', requestSignin);