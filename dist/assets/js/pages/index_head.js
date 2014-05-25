jQuery(function() {
    "use strict";
    var $ = jQuery;
    window.mrktEng = window.mrktEng || {};
    window.mrktEng.index = window.mrktEng.index || {};
    window.mrktEng.index.adjustHeight = function() {
        if (Modernizr.mq("only screen and (min-width: 960px)")) {
            $("#cta").css("height", $(window).height() - $("header").height() + "px");
        }
    };
});