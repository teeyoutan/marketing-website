(function($) {
    try {
        (function($) {
            "use strict";
            try {
                window.mrktEng = window.mrktEng || {};
                window.mrktEng.index = window.mrktEng.index || {};
                window.mrktEng.index.testItOut = function(editURL) {
                    window.location = "https://www.optimizely.com/edit?url=" + editURL;
                };
                $('input[type="text"]').focus();
                $("form").submit(function(e) {
                    var inputVal = $('input[type="text"]').val();
                    if (inputVal) {
                        window.mrktEng.index.testItOut(inputVal);
                    } else {
                        $('input[type="text"]').focus();
                        console.log("");
                    }
                    e.preventDefault();
                });
            } catch (error) {
                console.log("error");
            }
        })(jQuery);
    } catch (error) {}
})(jQuery);