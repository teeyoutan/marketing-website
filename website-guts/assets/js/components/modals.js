console.log('modals script loaded');

window.optly = window.optly || {};
window.optly.mrkt = window.optly.mrkt || {};
var baseUrl = document.URL,
  History = window.History || {},
  Modernizr = window.Modernizr || {},
  $elms = {
    signup: $('[data-opty-modal="signup"]'),
    signin: $('[data-opty-modal="signin"]')
  },
  initialTime = Date.now(),
  lastPop,
  testEl = $('#vh-test'),
  vhSupported,
  evalHistoryStorage = Modernizr.history && !!window.sessionStorage;

// FUNCTIONS

function setHistoryId(stateData) {
  if (stateData._id) {
    stateData._id += 1;
  } else if (sessionStorage._id) {
    stateData._id = Number(sessionStorage._id) + 1;
  } else {
    stateData._id = 1;
  }
}

function openModalHandler() {
  var modalType = $(this).data('modal-click');
  // Check for History/SessionStorage support
  if (evalHistoryStorage) {
    var stateData = History.getState().data;
    stateData.modalType = modalType;
    setHistoryId(stateData);
    History.pushState(stateData, 'modal open', baseUrl);
  }
  window.optly.mrkt.openModal(modalType);
}

function closeModalHandler(e) {
  var $modalCont = $(this);
  var $clickedElm = $(e.target);
  if ($modalCont.find(e.target).length === 0 || $clickedElm.data('modal-btn') === 'close') {
    // move history back because this event is outside of the history navigation state
    //console.log('state data in close: ', History.getState().data);
    if (evalHistoryStorage) {
      History.back();
    } else {
      window.optly.mrkt.closeModal($modalCont.data('opty-modal'));
    }
  }
}

// Only use this function if History/Session Storage is supported
function storeModalState(modalType, modalOpen) {
  // set the modal type and last type for an open event
  if (modalOpen) {
    sessionStorage.modalType = modalType;
    sessionStorage.lastType = '';
  }
  // set the modal type and last type for an close event
  else {
    sessionStorage.modalType = '';
    sessionStorage.lastType = modalType;
  }

  // increment the session modal state ID if it has currently been set
  if (sessionStorage._id) {
    sessionStorage._id = Number(sessionStorage._id) + 1;
  }
  // create the session modal state ID if it doesn't exist
  else {
    sessionStorage._id = 1;
  }
}

window.optly.mrkt.openModal = function(modalType) {
  var $elm = $elms[modalType];

  if (evalHistoryStorage) {
    // Update the modal state in the session storage
    storeModalState(modalType, true);
  }

  // Fade out the modal and attach the close modal handler
  $elm.fadeToggle(function() {
    $elm.bind('click', closeModalHandler);
  });
};

window.optly.mrkt.closeModal = function(modalType) {
  var $elm = $elms[modalType];

  if (evalHistoryStorage) {
    // Update the modal state in the session storage
    storeModalState(modalType, false);
  }
  
  // Fade out the modal and remove the close modal handler
  $elm.fadeToggle(function() {
    $elm.unbind('click', closeModalHandler);
  });
};

// Only use if History/Session Storage in Enabled
function initiateModal() {
  //Trigger Dialog if # is present in URL
  if (sessionStorage.modalType === 'signup' || sessionStorage.modalType === 'signin') {
    var modalType = sessionStorage.modalType;
    window.optly.mrkt.openModal(modalType);
  }
}

function handlePopstate(e) {
  // Safari fires an initial popstate, we want to ignore this
  if ((e.timeStamp - initialTime) > 20 || (e.timeStamp - lastPop) > 20) {
    console.log('popstate modal open/close');
    if (sessionStorage.modalType === '' || sessionStorage.modalType === undefined) {
      if (!!sessionStorage.lastType) {
        window.optly.mrkt.openModal(sessionStorage.lastType);
      }
    } else {
      window.optly.mrkt.closeModal(sessionStorage.modalType);
    }
  }
  lastPop = e.timeStamp;
}

function setModalHeight() {
  if (window.innerWidth <= 720) {
    if (!vhSupported) {
      $.each($elms, function(key, value) {
        console.log('resize');
        value.css({
          height: window.innerHeight
        });
      });
    }
  }
}

//INITIALIZATION

if (evalHistoryStorage) {
  // Check if modal state exists from previous page view 
  initiateModal();
  // Bind to popstate
  window.setTimeout(function(){
    this.addEventListener('popstate', handlePopstate);
  }, 0);
}

// Bind modal open to nav click events
$('ul.utility-nav').delegate('[data-modal-click]', 'click', openModalHandler);

// Test for vh CSS property to make modal full height at mobile screen size
testEl.css({
  height: '100vh'
});
vhSupported = testEl.height() === window.innerHeight;
// Set the modal height
$(window).bind('load resize', setModalHeight);