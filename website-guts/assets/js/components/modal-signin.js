var $signinModal = $('[data-optly-modal="signin"]');

function requestSignin(e) {
  e.preventDefault();
  var deffered = $.ajax({
    type: 'POST',
    url: '/account/signin'
  });
  

  deffered.then(function(data) {
    if (data.success === 'true') {
      sessionStorage.modalType = '';
      window.location.reload();
    }
  }, function(err) {  
    console.log('singin error: ', err);
  });

}

$signinModal.delegate('[data-modal-btn="signin"]', 'click', requestSignin);