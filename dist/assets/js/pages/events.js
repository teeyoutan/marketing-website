(function($) {
    "use strict";
    try {
        var mrktEng = mrktEng || {};
        mrktEng.events = {};
        mrktEng.events.showEvents = function(url, div) {
            $.get(url).always(function(data, textStatus, jqXHR) {
                if (jqXHR.status === 200) {
                    try {
                        if (data.feed.entry instanceof Array) {
                            var i, events, eventHTML, eventTemplate;
                            events = "";
                            eventHTML = '<div class="event-cont">' + '<div class="left">' + "<time>{{startMonth}} {{startDay}} - {{endMonth}} {{endDay}}, {{endYear}}</time>" + '<p class="venue">{{venue}}</p>' + "<p>{{cityState}}</p>" + "</div>" + '<div class="right">' + '<h4><a href="{{link}} target="_blank">{{title}}</a></h4>' + "<p>{{description}}</p>" + "</div>" + "</div><!--/.event-cont-->";
                            eventTemplate = Handlebars.compile(eventHTML);
                            for (i = 0; i <= data.feed.entry.length - 1; i++) {
                                var entry, eventData, venue, startDate, endDate, zeroRegEx;
                                entry = data.feed.entry[i];
                                startDate = moment(entry.gd$when[0].startTime);
                                endDate = moment(entry.gd$when[0].endTime);
                                zeroRegEx = /\-0/g;
                                if (typeof entry.gd$where[0].valueString === "string") {
                                    venue = entry.gd$where[0].valueString.split(" /")[0];
                                }
                                eventData = {
                                    title: entry.title.$t,
                                    link: entry.content.$t.split(" --")[0],
                                    cityState: entry.gd$where[0].valueString.split("/ ")[1],
                                    startMonth: startDate.format("MMM"),
                                    startDay: startDate.format("D"),
                                    endMonth: endDate.format("MMM"),
                                    endDay: endDate.format("D"),
                                    endYear: endDate.format("YYYY"),
                                    description: entry.content.$t.split("-- ")[1],
                                    venue: venue
                                };
                                events += eventTemplate(eventData);
                            }
                            $(div).append(events);
                        } else {
                            console.log("1");
                        }
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log("2");
                }
            });
        };
        mrktEng.events.showEvents("https://www.google.com/calendar/feeds/optimizely.com_hh3e0hadjvjs9gh34mdlevverk@group.calendar.google.com/public/full?alt=json&orderby=starttime&max-results=30&singleevents=true&sortorder=ascending&futureevents=true", "#future-events-cont");
        $("body").delegate("#get-past-events", "click", function(e) {
            mrktEng.events.showEvents("https://www.google.com/calendar/feeds/optimizely.com_hh3e0hadjvjs9gh34mdlevverk@group.calendar.google.com/public/full?alt=json&orderby=starttime&max-results=30&singleevents=true&sortorder=ascending&futureevents=false", "#past-events-cont");
            e.preventDefault();
        });
    } catch (e) {
        console.log(e);
    }
})(jQuery);