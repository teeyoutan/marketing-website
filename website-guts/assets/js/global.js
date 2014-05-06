/* global FastClick: false */

(function(jQuery){

	'use strict';

	var $;

	$ = jQuery;

	try {

		$(function(){
			FastClick.attach(document.body);
		});		

	} catch(error) {

	}

})(jQuery);