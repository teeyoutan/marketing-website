/* global FastClick: false */

window.optly.mrkt.isMobile = function(){

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

		return true;

	} else {

		return false;

	}

};

window.optly.mrkt.mobileJS = function(){

	if( window.optly.mrkt.isMobile() ){

		FastClick.attach(document.body);

		$('body').delegate('.mobile-nav-toggle', 'click', function(e){

				$('body').toggleClass('nav-open');

				e.preventDefault();

		});

		$('.user-nav-toggle').click(function(e){

				$('body').toggleClass('user-nav-open');

				e.preventDefault();

		});

		$('#main-nav ul').each(function(){

				$(this).css('max-height', $(this).height() + 'px');

		});

		$('body').addClass('mobile-nav-ready');

		$('#main-nav > li').click(function(){

				$(this).toggleClass('active').find('ul').toggleClass('active');

		});

	}

};

window.optly.mrkt.mobileJS();

//apply active class to active links
window.optly.mrkt.activeLinks = {};

window.optly.mrkt.activeLinks.currentPath = window.location.pathname;

window.optly.mrkt.activeLinks.markActiveLinks = function(){

	$('a').each(function(){

		if(

			$(this).attr('href') === window.optly.mrkt.activeLinks.currentPath ||
			$(this).attr('href') + '/' === window.optly.mrkt.activeLinks.currentPath

		){

			$(this).addClass('active');

		}

	});


};

window.optly.mrkt.inlineFormLabels = function(){

	$('form.inline-labels :input').each(function(index, elem) {

			var eId = $(elem).attr('id');

			var label = null;

			if (eId && (label = $(elem).parents('form').find('label[for='+eId+']')).length === 1) {

					$(elem).attr('placeholder', $(label).html());

					$(label).addClass('hide-label');

			}

	});

};

window.optly.mrkt.inlineFormLabels();

window.optly.mrkt.activeLinks.markActiveLinks();

jQuery.oFormGlobalOverrides = {};

jQuery.oFormGlobalOverrides.reportValidationError = function(element){

	window.analytics.track( $(element).attr('name') + ' validation error', {

		category: 'form field error',

		label: window.location.pathname

	});

};
