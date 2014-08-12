window.optly = window.optly || {};
window.optly.mrkt = window.optly.mrkt || {};
window.optly.mrkt.anim= window.optly.mrkt.anim || {};

// Autoprefix CSS transition end listener
window.optly.mrkt.anim.transitionend = (function(transition) {
   var transEndEventNames = {
       'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
       'MozTransition'    : 'transitionend',      // only for FF < 15
       'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
  };

  return transEndEventNames[transition];
})(window.Modernizr.prefixed('transition'));

window.optly.mrkt.anim.bindTranEnd = function($elm) {
  
  $elm.bind(this.transitionend, function() {
   var classList = Array.prototype.slice.call( $elm[0].classList );

    // If the animation is over and modal is closed display none
   if ( classList.indexOf('leave') !== -1 ) {
     $elm.addClass('optly-hide')
         .removeClass('anim-leave leave');

     $elm.unbind(this.transitionend, this.bindTranEnd);
   } 
   // If the animation is over and modal is open
   else if ( classList.indexOf('anim-enter') !== -1 ) {
     $elm.removeClass('anim-enter');

     $elm.unbind(this.transitionend, this.bindTranEnd);
   }
  }.bind(this));

};

window.optly.mrkt.anim.enter = function($elm) {
  this.bindTranEnd( $elm );

  $elm.removeClass('optly-hide')
    .addClass('anim-enter')
    .delay(50)
    .queue(function(next) {
      $elm.addClass('enter');
      next();
    });
};

window.optly.mrkt.anim.leave = function ($elm) {
  this.bindTranEnd( $elm );

  $elm.removeClass('enter')
    .addClass('anim-leave')
    .delay(50)
    .queue(function(next){
      $elm.addClass('leave');
      next();
    });
};