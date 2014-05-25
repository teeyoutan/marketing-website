/* global FastClick: false */
(function($){

	'use strict';

	try {

		$(function(){

			window.mrktEng = {};

			//apply fastclick for mobile devices
			FastClick.attach(document.body);

			//apply active class to active links
			window.mrktEng.activeLinks = {};

			window.mrktEng.activeLinks.currentPath = window.location.pathname;

			window.mrktEng.activeLinks.markActiveLinks = function(){

				$('a').each(function(){

					if(

						$(this).attr('href') === window.mrktEng.activeLinks.currentPath ||
						$(this).attr('href') + '/' === window.mrktEng.activeLinks.currentPath

					){

						$(this).addClass('active');

					}

				});


			};

			window.mrktEng.activeLinks.markActiveLinks();

		});

	} catch(error) {

	}

})(jQuery);
