/* global console: false, Handlebars: false */
(function($){

  'use strict';

  try {

    $.get('https://www.google.com/calendar/feeds/optimizely.com_hh3e0hadjvjs9gh34mdlevverk@group.calendar.google.com/public/full?alt=json&orderby=starttime&max-results=30&singleevents=true&sortorder=ascending&futureevents=true').always(function(data, textStatus, jqXHR){

      if(jqXHR.status === 200){

        try {

          if( data.feed.entry instanceof Array ){

            var i, events, eventHTML, eventTemplate;

            events = '';

            eventHTML = '<div class="event-cont">' +
                          '<div class="left">' +
                              '<time>{{startMonth}} {{startDay}} - {{endMonth}} {{endDay}}, {{endYear}}</time>' +
                              '<p class="venue">{{venue}}</p>' +
                              '<p>{{cityState}}</p>' +
                            '</div>' +
                            '<div class="right">' +
                              '<h4><a href="{{link}} target="_blank">{{title}}</a></h4>' +
                              '<p>{{description}}</p>' +
                            '</div>' +
                        '</div><!--/.event-cont-->';

            eventTemplate = Handlebars.compile(eventHTML);

            for(i = 0; i <= data.feed.entry.length - 1; i++){

              var entry, eventData, venue, startDate, endDate, zeroRegEx;

              entry = data.feed.entry[i];

              startDate = new Date( entry.gd$when[0].startTime.replace(zeroRegEx, '-') );

              console.log(startDate);

              endDate = new Date( entry.gd$when[0].endTime.replace(zeroRegEx, '-') );

              zeroRegEx = /\-0/g;

              if(typeof entry.gd$where[0].valueString === 'string'){

                venue = entry.gd$where[0].valueString.split(' /')[0];

              }

              eventData = {

                title: entry.title.$t,

                link: entry.content.$t.split(' --')[0],

                cityState: entry.gd$where[0].valueString.split('/ ')[1],

                startMonth: startDate.getMonth(),

                startDay: startDate.getDay(),

                endMonth: endDate.getMonth(),

                endDay: endDate.getDay(),

                endYear: endDate.getYear(),

                description: entry.content.$t.split('-- ')[1],

                venue: venue

              };

              events += eventTemplate(eventData);

            }

            $('#future-events-cont').append(events);

          } else {

            console.log('');

          }

        } catch (error) {

          //report error to google analytics
          //_gaq.push(['_trackEvent', 'api error', 'google_cal', 'response contains invalid JSON']);
          console.log(error);

        }

      } else {

        //report non 200 to google analytics
        //_gaq.push(['_trackEvent', 'api error', 'api_name', 'status code: ' + jqXHR.status]);
        console.log('2');

      }

    });

  } catch (e) {

    //_gaq.push(['_trackEvent', 'page js error', '/events']);
    console.log('3');

  }

})(jQuery);
