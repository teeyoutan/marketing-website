(function($){ 

  window.optly = window.optly || {}; 

  window.optly.mrkt = window.optly.mrkt || {}; 

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
})(jQuery);