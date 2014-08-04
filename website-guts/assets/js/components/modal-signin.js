var $signinModal = $('[data-optly-modal="signin"]');

function requestSignin(e) {
  e.preventDefault();
  var deffered = window.optly.mrkt.services.xhr.makeRequest({
    type: 'GET',
    url: '/account/signin'
  });
  console.log(deffered);
  debugger;

}

$signinModal.delegate('data-modal-btn="close"', 'click', requestSignin);