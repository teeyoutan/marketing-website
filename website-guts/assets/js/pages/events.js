window.optly.mrkt.events = {};

window.optly.mrkt.events.showEvents = function(url, div){

  var templateContext = {};

  templateContext.events = [];

  $.get(url).always(function(data, textStatus, jqXHR){

    if(jqXHR.status === 200){

      try {

        if( data.feed.entry instanceof Array ){

          var i, container;

          container = {};

          for(i = 0; i <= data.feed.entry.length - 1; i++){

            var entry, eventData, venue, startDate, endDate, zeroRegEx;

            entry = data.feed.entry[i];

            startDate = moment( entry.gd$when[0].startTime );

            endDate = moment( entry.gd$when[0].endTime );

            zeroRegEx = /\-0/g;

            if(typeof entry.gd$where[0].valueString === 'string'){

              venue = entry.gd$where[0].valueString.split(' /')[0];

            }

            eventData = {

              title: entry.title.$t,

              link: entry.content.$t.split(' --')[0],

              cityState: entry.gd$where[0].valueString.split('/ ')[1],

              startMonth: startDate.format('MMM'),

              startDay: startDate.format('D'),

              endMonth: endDate.format('MMM'),

              endDay: endDate.format('D'),

              endYear: endDate.format('YYYY'),

              description: entry.content.$t.split('-- ')[1],

              venue: venue

            };

            templateContext.events.push(eventData);

          }

          $(div).append(window.optly.mrkt.templates.eventDisplay(templateContext));

        } else {

          console.log('1');

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

};

//show future events
window.optly.mrkt.events.showEvents('https://www.google.com/calendar/feeds/optimizely.com_hh3e0hadjvjs9gh34mdlevverk@group.calendar.google.com/public/full?alt=json&orderby=starttime&max-results=30&singleevents=true&sortorder=ascending&futureevents=true', '#future-events-cont');

$('body').delegate('#get-past-events', 'click', function(e){

  window.optly.mrkt.events.showEvents('https://www.google.com/calendar/feeds/optimizely.com_hh3e0hadjvjs9gh34mdlevverk@group.calendar.google.com/public/full?alt=json&orderby=starttime&max-results=30&singleevents=true&sortorder=ascending&futureevents=false', '#past-events-cont');

  e.preventDefault();

});
