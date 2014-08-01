(function($){ 

  window.optly = window.optly || {}; 

  window.optly.mrkt = window.optly.mrkt || {}; 

var eventDisplayHTML, templateContext, dateArray, i;

window.optly.mrkt.webinar = {};

window.optly.mrkt.webinar.getThursdays = function() {

  var numDates,
      today,
      webinarDay,
      webinarHour,
      webinarMinute,
      webinarDayAndTimeInSeconds,
      todayInSeconds,
      dates,
      secondsUntilNextWebinar,
      daysToSeconds,
      hoursToSeconds,
      minutesToSeconds,
      i;

  numDates = 3;
  today = new Date();
  webinarDay = 4; // Thursday
  webinarHour = 11; // 11 am
  webinarMinute = 15; // 15 minutes past the hour

  daysToSeconds = function(days){
    return days * 24 * 60 * 60;
  };
  hoursToSeconds = function(hours){
    return hours * 60 * 60;
  };
  minutesToSeconds = function(minutes){
    return minutes * 60;
  };

  webinarDayAndTimeInSeconds = daysToSeconds(webinarDay) + hoursToSeconds(webinarHour) + minutesToSeconds(webinarMinute);
  todayInSeconds = daysToSeconds(today.getDay()) + hoursToSeconds(today.getHours()) + minutesToSeconds(today.getMinutes());
  dates = new Array(numDates);
  secondsUntilNextWebinar = todayInSeconds - webinarDayAndTimeInSeconds;

  if(secondsUntilNextWebinar >= 0){
    secondsUntilNextWebinar = daysToSeconds(7) - secondsUntilNextWebinar;
  } else {
    secondsUntilNextWebinar = -secondsUntilNextWebinar;
  }

  for (i = numDates - 1; i >= 0; i--) {
    dates[i] = new Date(today.getTime() + (secondsUntilNextWebinar + daysToSeconds(i * 7)) * 1000);
  }

  return dates;

};

templateContext = {};

templateContext.thursdays = [];

dateArray = window.optly.mrkt.webinar.getThursdays();

for(i = 0; i < dateArray.length; i++){
  var container, date;
  container = {};
  date = moment(dateArray[i]);
  container.month = date.format('MMMM');
  container.day = date.format('D');
  container.dateLong = date.format('M-D-YYYY');
  templateContext.thursdays.push(container);
}

eventDisplayHTML = window.optly.mrkt.templates.webinarEventDisplay(templateContext);

$('#events').html(eventDisplayHTML);

$('body').delegate('.register-btn', 'click', function(e){

  e.preventDefault();

  var dateString, dateLong, elem;

  elem = $(this);

  dateString = elem.attr('data-date-string');

  dateLong = elem.attr('data-date-long');

  $('#date-string').text(dateString);

  $('#date-long').val(dateLong);

  window.optly.mrkt.modal.open('webinar-signup');

});
})(jQuery);