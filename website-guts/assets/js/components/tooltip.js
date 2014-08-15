function Tooltip($tooltipElm, $targetElm) {
  this.tooltipElm = $tooltipElm;
  this.targetElm  = $targetElm;
}

Tooltip.prototype.clickOffClose = function(e) {
  debugger;
  if (this.tooltipElm.is(e.target) && this.tooltipElm.has(e.target).length === 0) {
    window.optly.mrkt.anim.leave(this.tooltipElm);
    $(document).unbind('click', this.clickOffClose);
  }
};

function showTipEvent(e) {
  var tip = new Tooltip( $('#tooltip'), $(this) );

  tip.initTooltip({
    y: e.PageY,
    x: e.PageX
  });
}

Tooltip.prototype.initTooltip = function(ePosition) {
  var pos_top, pos_left;

  if( $( window ).width() < this.tooltipElm.outerWidth() * 1.5 ) {
    this.tooltipElm.addClass('mobile-tip').removeClass('desktop-tip');
  } else {
    this.tooltipElm.addClass('desktop-tip').removeClass('mobile-tip');
  }

  pos_left = this.targetElm.offset().left + ( this.targetElm.outerWidth() / 2 ) - ( this.tooltipElm.outerWidth() / 2 );
  pos_top  = this.targetElm.offset().top - this.tooltipElm.outerHeight() - 20;

  if( pos_left < 0 ){
    pos_left = this.targetElm.offset().left + this.targetElm.outerWidth() / 2 - 20;
    this.tooltipElm.addClass( 'left-tip' );
  }
  else {
    this.tooltipElm.removeClass( 'left-tip' );
  }
    

  if( pos_left + this.tooltipElm.outerWidth() > $( window ).width() ){
    pos_left = this.targetElm.offset().left - this.tooltipElm.outerWidth() + this.targetElm.outerWidth() / 2 + 20;
    this.tooltipElm.addClass( 'right-tip' );
  }
  else {
    this.tooltipElm.removeClass( 'right-tip' );
  }
    
  if( pos_top < 0 ) {
    pos_top  = this.targetElm.offset().top + this.targetElm.outerHeight();
    this.tooltipElm.addClass( 'top-tip' );
  }
  else {
    this.tooltipElm.removeClass( 'top-tip' );
  }

  this.tooltipElm
    .text( this.targetElm.attr('title') )
    .delay(0)
    .queue(function(next) {
      window.optly.mrkt.anim.enter(this.tooltipElm);
      next();
    }.bind(this))
    .delay(0)
    .queue(function(next){
      this.positionTip();
      next();
    }.bind(this))
    .unbind('click mouseover', showTipEvent);

  $(document).bind('click', this.clickOffClose.bind(this));

  // make the tooltip move with the window
  $(window).on('resize', this.positionTip.bind(this));
};

Tooltip.prototype.positionTip = function() {
  this.tooltipElm.css({
    top: (this.targetElm.offset().top - $('body').scrollTop() - this.tooltipElm.outerHeight() - 10 ) + 'px',
    left: (this.targetElm.offset().left - this.tooltipElm.outerWidth() / 2 + 10) + 'px'
  });
};

$(function() {
  var $targetElm = $('[data-tooltip-trigger]');
  
  $targetElm.on('click mouseover', showTipEvent);
});



