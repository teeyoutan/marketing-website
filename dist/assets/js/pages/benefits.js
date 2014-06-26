(function($) {
    window.optly = window.optly || {};
    window.optly.mrkt = window.optly.mrkt || {};
    window.optly.mrkt.benefits = {};
    window.optly.mrkt.benefits.menu = function() {
        $("body").delegate(".for-menu", "click", function(event) {
            event.stopPropagation();
            $(this).toggleClass("shown");
        });
        $("html").click(function() {
            $(".for-menu").removeClass("shown");
        });
    };
    window.optly.mrkt.benefits.menu();
})(jQuery);