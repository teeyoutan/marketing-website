(function($) {
    "use strict";
    try {
        $.get("https://www.google.com/calendar/feeds/optimizely.com_hh3e0hadjvjs9gh34mdlevverk@group.calendar.google.com/public/full?alt=json&orderby=starttime&max-results=30&singleevents=true&sortorder=ascending").always(function(data, textStatus, jqXHR) {
            if (jqXHR.status === 200) {
                try {
                    console.log("test");
                } catch (error) {
                    _gaq.push([ "_trackEvent", "api error", "google_cal", "response contains invalid JSON" ]);
                }
            } else {
                _gaq.push([ "_trackEvent", "api error", "api_name", "status code: " + jqXHR.status ]);
            }
        });
    } catch (e) {
        _gaq.push([ "_trackEvent", "page js error", "/events" ]);
    }
})(jQuery);