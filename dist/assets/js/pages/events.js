(function($) {
    "use strict";
    try {
        $.get("https://www.google.com/calendar/feeds/optimizely.com_hh3e0hadjvjs9gh34mdlevverk@group.calendar.google.com/public/full?alt=json&orderby=starttime&max-results=30&singleevents=true&sortorder=ascending&futureevents=true").always(function(data, textStatus, jqXHR) {
            if (jqXHR.status === 200) {
                try {
                    console.log(data);
                    if (data.feed.entry instanceof Array) {
                        var i;
                        for (i = 0; i <= data.feed.entry.length - 1; i++) {
                            var entry, title, link, venue, cityState, startDate, endDate, zeroRegEx;
                            entry = data.feed.entry[i];
                            title = entry.title.$t;
                            link = entry.content.$t.split(" --")[0];
                            if (typeof entry.gd$where[0].valueString === "string") {
                                venue = entry.gd$where[0].valueString.split(" /")[0];
                            }
                            cityState = entry.gd$where[0].valueString.split("/ ")[1];
                            zeroRegEx = /\-0/g;
                            startDate = new Date(entry.gd$when[0].startTime.replace(zeroRegEx, "-"));
                            endDate = new Date(entry.gd$when[0].endTime.replace(zeroRegEx, "-"));
                            console.log('"' + endDate + '"');
                        }
                    } else {
                        console.log("");
                    }
                } catch (error) {
                    console.log("");
                }
            } else {
                console.log("");
            }
        });
    } catch (e) {
        console.log("");
    }
})(jQuery);