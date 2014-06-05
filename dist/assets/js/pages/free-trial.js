(function($) {
    window.optly = window.optly || {};
    window.optly.mrkt = window.optly.mrkt || {};
    try {
        $("form :input").each(function(index, elem) {
            var eId = $(elem).attr("id");
            var label = null;
            if (eId && (label = $(elem).parents("form").find("label[for=" + eId + "]")).length === 1) {
                $(elem).attr("placeholder", $(label).html());
                $(label).addClass("hide-label");
            }
        });
        var beforeFunc, afterFunc;
        beforeFunc = function() {
            console.log("beforeFunc running");
        };
        afterFunc = function(arg) {
            console.log("after function running");
            console.log(arg);
        };
        $("#seo-form").oForm({
            url: "/account/free_trial_landing",
            before: beforeFunc,
            after: afterFunc
        });
    } catch (error) {
        window.console.log("js error: " + error);
    }
})(jQuery);