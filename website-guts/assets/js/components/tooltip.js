window.optly.mrkt.tooltip = window.optly.mrkt.tooltip || {};

window.optly.mrkt.tooltip.showTipEvent = function(e) {
  // determine the type of tooltip and bind the target and tooltip elements to the object scope
  this.$targetElm = $(e.target);
  var targetData = this.$targetElm.data('tooltip-trigger');
  this.$tooltipElm = $('[data-tooltip="' + targetData + '"]');

  //initiate the animation queue
  this.tooltipQ = this.initTipQ();

  //set tooltip text
  this.$tooltipElm.text( this.$targetElm.attr('title') );

  for(var i = 0; i < this.tooltipQ.queue('showTip').length; i += 1) {
    this.tooltipQ.dequeue('showTip');
  }

}.bind(window.optly.mrkt.tooltip);

window.optly.mrkt.tooltip.init = function($targets, $tooltips) {
  this.$targets = $targets;
  this.$tooltips = $tooltips;
  $targets.on('click mouseover', window.optly.mrkt.tooltip.showTipEvent.bind(this));
};

window.optly.mrkt.tooltip.positionTip = function() {
  var $q = $({});

  $q.queue('positionTip', function(next) {
    if( $( window ).width() < this.$tooltipElm.outerWidth() * 1.5 ) {
      this.$tooltipElm.addClass('mobile-tip').removeClass('desktop-tip');
    } else {
      this.$tooltipElm.addClass('desktop-tip').removeClass('mobile-tip');
    }
    next();
  }.bind(this));

  $q.queue('positionTip', function(next) {
    this.configTooltip();
    next();
  }.bind(this));

  for(var i = 0; i < $q.queue('positionTip').length; i += 1) {
    $q.dequeue('positionTip');
  }

};

window.optly.mrkt.tooltip.clickOffClose = function(e) {
  if (!this.$tooltipElm.is(e.target) && this.$tooltipElm.has(e.target).length === 0 && e.target !== this.$targetElm[0]) {
    window.optly.mrkt.anim.leave(this.$tooltipElm);
    $(document).unbind('click', this.clickOffClose);
  }
};

window.optly.mrkt.tooltip.initTipQ = function() {
  var $q = $({});

  $q.queue('showTip', function(next) {
    window.optly.mrkt.anim.enter(this.$tooltipElm);
    next();
  }.bind(this));

  $q.queue('showTip', function(next) {
    this.positionTip();
    next();
  }.bind(this));

  $q.queue('showTip', function(next) {
    this.$tooltipElm.unbind('click mouseover', window.optly.mrkt.tooltip.showTipEvent.bind(this));
    next();
  }.bind(this));

  $q.queue('showTip', function(next) {
    $(window).on('resize scroll', this.positionTip.bind(this));
    next();
  }.bind(this));

  $q.queue('showTip', function(next) {
    $(document).bind('click', this.clickOffClose.bind(this));
    next();
  }.bind(this));

  return $q;
};

window.optly.mrkt.tooltip.configTooltip = function() {
  var posTop, posLeft, tipHorizontalOffset, tipVerticalOffset, currentTip;

  tipHorizontalOffset = ( this.$targetElm.outerWidth() / 2 ) + ( this.$tooltipElm.outerWidth() / 2 );
  tipVerticalOffset = this.$tooltipElm.outerHeight() + this.$targetElm.outerHeight();
  posLeft = this.$targetElm.offset().left;
  posTop  = this.$targetElm.offset().top - $('body').scrollTop();

  if( posLeft + tipHorizontalOffset >= window.innerWidth ) {
    currentTip = 'left-tip';
    this.$tooltipElm.css({
      top: this.$targetElm.offset().top - $('body').scrollTop() - this.$tooltipElm.outerHeight() / 2 + this.$targetElm.outerHeight() / 2 + 'px',
      left: (this.$targetElm.offset().left + this.$targetElm.outerWidth() + 10 ) + 'px'
    });
  }
    
  if( posLeft - tipHorizontalOffset <= 0 ){
    currentTip = 'right-tip';
    this.$tooltipElm.css({
      top: this.$targetElm.offset().top - $('body').scrollTop() - this.$tooltipElm.outerHeight() / 2 + this.$targetElm.outerHeight() / 2 + 'px',
      left: (this.$targetElm.offset().left - this.$tooltipElm.outerWidth() - 5) + 'px'
    });
  }
    
  if( posTop + tipVerticalOffset <= window.innerHeight ) {
    currentTip = 'top-tip';
    this.$tooltipElm.css({
      top: (this.$targetElm.offset().top - $('body').scrollTop() + this.$targetElm.outerHeight() + 10 ) + 'px',
      left: (this.$targetElm.offset().left - this.$tooltipElm.outerWidth() / 2 + 5) + 'px'
    });
  }

  //default scenario bottom
  if(currentTip === undefined) {
    this.$tooltipElm.css({
      top: (this.$targetElm.offset().top - $('body').scrollTop() - this.$tooltipElm.outerHeight() - 10 ) + 'px',
      left: (this.$targetElm.offset().left - this.$tooltipElm.outerWidth() / 2 + 5) + 'px'
    });
  }

  if(this.lastTip !== undefined && currentTip === undefined) {
    // if orientation was previously defined but now default orientation
    this.$tooltipElm.removeClass(this.lastTip);
    console.log('first');
  } else if (currentTip !== this.lastTip && this.lastTip !== undefined) {
    // if a previous orientation was defined and the current orientation is different than previous
    this.$tooltipElm.removeClass(this.lastTip).addClass(currentTip);
    console.log('second');
  } else if (this.lastTip === undefined && currentTip !== undefined) {
    // if there was no previous oriention but now there is
    this.$tooltipElm.addClass(currentTip);
    console.log('last');
  }

  this.lastTip = currentTip;

};

$(function() {
  var $targetElms = $('[data-tooltip-trigger]');
  var $tooltipElms = $('[data-tooltip]');
  
  window.optly.mrkt.tooltip.init($targetElms, $tooltipElms);
});



