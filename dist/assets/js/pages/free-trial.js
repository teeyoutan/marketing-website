(function($){ 

  window.optly = window.optly || {}; 

  window.optly.mrkt = window.optly.mrkt || {}; 

window.optly.mrkt.inlineFormLabels();

$('#seo-form').oForm({

  afterLocal: window.optly.mrkt.oForm.ppcFormDefaultResponseHandler

});
})(jQuery);