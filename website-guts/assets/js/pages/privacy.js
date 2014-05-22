/* global _gaq: false */
(function($){

	'use strict';

	try {

		var checkRemarketingState;

		checkRemarketingState = function(){

			if( $.cookie('remarketing') ){

				$('body').toggleClass('remarketing-opt-out');

				$('#remarketing-remove').addClass('disabled');

			}

		};

		checkRemarketingState();

		$('body').delegate('#remarketing-remove', 'click', function(){

			$.cookie('remarketing', 'true', {expires: 365, path: '/'});

			checkRemarketingState();

			$(this).addClass('disabled');

		});

	} catch(e) {

		_gaq.push(['_trackEvent', 'page js error', '/privacy']);

	}

})(jQuery);
