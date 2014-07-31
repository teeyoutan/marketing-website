window.optly = window.optly || {};
window.optly.mrkt = window.optly.mrkt || {};
window.optly.mrkt.modal = {};
var History = window.History || {},
  Modernizr = window.Modernizr || {},
  $elms = {
    signup: $('[data-optly-modal="signup"]'),
    signin: $('[data-optly-modal="signin"]')
  },
  //baseUrl = document.URL,
  initialTime = Date.now(),
  lastPop,
  testEl = $('#vh-test'),
  vhSupported,
  isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
  isIosSafari = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent) || /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent),
  isIosChrome = !!navigator.userAgent.match('CriOS'),
  isHistorySupported = Modernizr.history && !!window.sessionStorage && ( !(isIosSafari || isSafari) ) || isIosChrome,
  historyIcrementor = 0,
  modalState = {};

// FUNCTIONS

function setHistoryId(historyData) {
  var stateData = {};
  if (historyData._id) {
    stateData._id = historyData._id + 1;
  }
  else if (sessionStorage._id) {
    stateData._id = sessionStorage._id + 1;
  }
  else {
    stateData._id = 1;
  }
  return stateData;
}

function openModalHandler() {
  var title,
    stateData,
    modalType = $(this).data('modal-click');

  // Check for History/SessionStorage support and how many items are on the history stack
  if (isHistorySupported && historyIcrementor === 0) {
    stateData = setHistoryId(History.getState().data);
    stateData.modalType = modalType;
    // increment history count to track if pushstate should occur on next iteration
    historyIcrementor += 1;
    title = modalType.charAt(0).toUpperCase() + modalType.slice(1);
    if (title === 'Signin') {
      title = 'Login';
    }
    History.pushState(stateData, title);
  } //else {
    //window.location.hash = modalType;
  //}
  window.optly.mrkt.modal.open(modalType);
}

function closeModalHandler(e) {
  var $modalCont = $(this);
  var $clickedElm = $(e.target);
  if ($modalCont.find(e.target).length === 0 || $clickedElm.data('modal-btn') === 'close') {
    // move history back because this event is outside of the history navigation state
    if (isHistorySupported) {
      // reset history count
      historyIcrementor = 0;
      History.back();
    } else {
      //window.location.hash = '';
      window.optly.mrkt.modal.close($modalCont.data('optly-modal'));
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

window.optly.mrkt.modal.open = function(modalType) {
  var $elm = $elms[modalType];

  // if modalState exists then close modal of the currently open modal state
  if(modalState.type !== undefined) {
    window.optly.mrkt.modal.close(modalState.type);
  }

  // update the global modal state
  modalState.type = modalType;

  if (isHistorySupported) {
    // Update the modal state in the session storage
    storeModalState(modalType, true);
  }

  if ( !$('html, body').hasClass('no-scroll') && window.innerWidth <= 768) {
    $('html, body').addClass('no-scroll');
  }

  // Fade out the modal and attach the close modal handler
  $elm.fadeToggle(function() {
    $elm.bind('click', closeModalHandler);
  });
};

window.optly.mrkt.modal.close = function(modalType) {
  var $elm = $elms[modalType];

  // update the global modal state
  modalState.type = undefined;

  if (isHistorySupported) {
    // Update the modal state in the session storage
    storeModalState(modalType, false);
  }

  if ( $('html, body').hasClass('no-scroll') ) {
    $('html, body').removeClass('no-scroll');
  }

  window.scrollTo(0,0);
  $elm.children()[0].scrollTop = 0;

  // Fade out the modal and remove the close modal handler
  $elm.fadeToggle(function() {
    $elm.unbind('click', closeModalHandler);
  });
};

// Only use if History/Session Storage in Enabled
function initiateModal() {
  var modalType;
  //Trigger Dialog if # is present in URL
  if (sessionStorage.modalType === 'signup' || sessionStorage.modalType === 'signin') {
    modalType = sessionStorage.modalType;
  }

  if (modalType !== undefined) {
    //historyIcrementor += 1;
    window.optly.mrkt.modal.open(modalType);
  }
}

function handlePopstate(e) {
  // Safari fires an initial popstate, we want to ignore this
  if ( (e.timeStamp - initialTime) > 20 ) {
    if (sessionStorage.modalType === '' || sessionStorage.modalType === undefined) {
      if (!!sessionStorage.lastType) {
        historyIcrementor += 1;
        window.optly.mrkt.modal.open(sessionStorage.lastType);
      }
    } else {
      historyIcrementor = 0;
      window.optly.mrkt.modal.close(sessionStorage.modalType);
    }
  }
  lastPop = e.timeStamp;
}

function setMobileProperties() {
  if (!$('html, body').hasClass('no-scroll') && window.innerWidth <= 768) {
    $('html, body').addClass('no-scroll');
  }
  else if ( $('html, body').hasClass('no-scroll') && window.innerWidth > 768) {
    $('html, body').removeClass('no-scroll');
  }
  if (!vhSupported) {
    if (window.innerWidth <= 768) {
      $.each($elms, function(key, $elm) {
        $( $elm.children()[0] ).css({
          height: window.innerHeight + 'px'
        });
      });
    }
    else {
      $.each($elms, function(key, $elm) {
        $( $elm.children()[0] ).css({
          height: 'auto'
        });
      });
    }
  }
}

//INITIALIZATION

if (isHistorySupported) {
  // Check if modal state exists from previous page view
  initiateModal();
  // Bind to popstate
  window.addEventListener('popstate', handlePopstate);
}

// Bind modal open to nav click events
$('body').delegate('[data-modal-click]', 'click', openModalHandler);

// Test for vh CSS property to make modal full height at mobile screen size
testEl.css({
  height: '100vh'
});

vhSupported = testEl.height() === window.innerHeight;

testEl.css({
  height: '0px'
});
// Set the modal height
$(window).bind('load resize', setMobileProperties);
