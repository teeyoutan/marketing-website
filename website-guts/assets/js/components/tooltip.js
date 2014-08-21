window.optly.mrkt.tooltip = window.optly.mrkt.tooltip || {};

window.optly.mrkt.tooltip.showTipEvent = function(e) {
  // determine the type of tooltip and bind the target and tooltip elements to the object scope
  this.$targetElm = $(e.target);
  var targetData = this.$targetElm.data('tooltip-trigger');
  this.$tooltipElm = this.$targetElm.find('[data-tooltip="' + targetData + '"]');

  //initiate the animation queue
  this.tooltipQ = this.initTipQ();

  //set tooltip text
  this.$tooltipElm.text( this.$targetElm.attr('title') );

  for(var i = 0; i < this.tooltipQ.queue('showTip').length; i += 1) {
    this.tooltipQ.dequeue('showTip');
  }

};

window.optly.mrkt.tooltip.init = function($targets) {
  this.$targets = $targets;
  this.$targets.each(function(i, elm) {
    var $targetElm = $(elm);

    $('<div data-tooltip="'+ $targetElm.data('tooltip-trigger') +'"></div>')
      .attr('class', 'optly-hide')
      .appendTo($targetElm);
  });
  this.$targets.on('click mouseover', window.optly.mrkt.tooltip.showTipEvent.bind(this));
};

window.optly.mrkt.tooltip.positionTip = function() {
  var $q = $({});

  $q.queue('positionTip', function(next) {
    if( $( window ).width() <= 768 ) {
      this.$tooltipElm.width( window.innerWidth * 0.4 );
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
  //uncomment below if want not close the tooltip when clicking on trigger when tip open
  if (!this.$tooltipElm.is(e.target) && this.$tooltipElm.has(e.target).length === 0 && e.target !== this.$targetElm[0]) {
  //if ( !this.$tooltipElm.is(e.target) && this.$tooltipElm.has(e.target).length === 0 ) {
    window.optly.mrkt.anim.leave(this.$tooltipElm);
    $(document).off('click');
    $(window).off('resize scroll');
    this.$targets.on('click mouseover', window.optly.mrkt.tooltip.showTipEvent.bind(this));
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
    this.$targets.off('click mouseover');
    next();
  }.bind(this));

  $q.queue('showTip', function(next) {
    $(window).on('resize', this.positionTip.bind(this));
    next();
  }.bind(this));

  $q.queue('showTip', function(next) {
    $(document).on('click', this.clickOffClose.bind(this));
    next();
  }.bind(this));

  return $q;
};

window.optly.mrkt.tooltip.toggleClass = function(added) {
  var rgx = /tip/g,
    matched;
  $(this.$tooltipElm.attr('class').split(' ')).each(function(index, cls) {
    if( rgx.test(cls) ) {
      this.$tooltipElm.removeClass(cls);
    }
  }.bind(this));
  if(added) {
    this.$tooltipElm.addClass(added);
  }
};

window.optly.mrkt.tooltip.configTooltip = function() {
  var targetPosTop, 
    targetPosLeft,
    tipHorizontalOffset, 
    tipVerticalOffset,
    posTop,
    posLeft, 
    currentTip;

  tipHorizontalOffset = this.$tooltipElm.outerWidth() / 2;
  tipVerticalOffset = this.$tooltipElm.outerHeight() + this.$targetElm.outerHeight() + 10;
  targetPosLeft = this.$targetElm.offset().left;
  targetPosTop  = this.$targetElm.offset().top - $('body').scrollTop();

  if( targetPosLeft + this.$targetElm.outerWidth() / 2 + tipHorizontalOffset >= window.innerWidth ) {
    currentTip = 'right-tip';
    posTop = targetPosTop - this.$tooltipElm.outerHeight() / 2 + this.$targetElm.outerHeight() / 2;
    posLeft =  (this.$targetElm.offset().left - this.$tooltipElm.outerWidth() - 5);
  } else if( targetPosLeft + this.$targetElm.outerWidth() / 2 - tipHorizontalOffset <= 0 ){
    currentTip = 'left-tip';
    posTop = targetPosTop - this.$tooltipElm.outerHeight() / 2 + this.$targetElm.outerHeight() / 2;
    posLeft = this.$targetElm.offset().left + this.$targetElm.outerWidth() + 10;
  } else if(currentTip === undefined) {
    posTop = -(this.$tooltipElm.outerHeight() + 10);
    posLeft = this.$targetElm.outerWidth() / 2 - this.$tooltipElm.outerWidth() / 2 + 5;
    //posTop = targetPosTop - this.$tooltipElm.outerHeight() - 10;
    //posLeft = this.$targetElm.offset().left + this.$targetElm.outerWidth() / 2 - this.$tooltipElm.outerWidth() / 2 + 5;
  }

  this.$tooltipElm.css({
    top: posTop + 'px',
    left: posLeft + 'px'
  });

  if(currentTip) {
    this.toggleClass(currentTip);
  } else if (this.lastTip) {
    this.$tooltipElm.removeClass(this.lastTip);
  }

  this.lastTip = currentTip;

};

$(function() {
  var $targetElms = $('[data-tooltip-trigger]');
  
  window.optly.mrkt.tooltip.init($targetElms);
});



