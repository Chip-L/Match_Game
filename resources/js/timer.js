/*
  Much of this came from https://stackoverflow.com/questions/2604450/how-to-create-a-jquery-clock-timer

  The time works off of the date function. This is the most accurate way to avoid drift. setInterval does not gauruntee a specific time, this means the timer can jumb. By using date, you are taking the time from an actual clock. It will always be correct. Again, it can jump.
*/

var Timer = {};

Timer.startTime = new Date;
Timer.totalSeconds = 0;
Timer.clock = ""; // stors the actual timer so that it can be stopped

/*
  The function to start keeping track of time
*/
Timer.startTimer = function() {
  Timer.startTime = new Date;
  Timer.totalSeconds = 0;

  Timer.clock = setInterval(function() {
    Timer.getTimerDisplay(Math.round(((new Date - Timer.startTime) / 1000), 0));
  }, 500);
}

/*
  This function stops the timer. Note: totalSeconds is still available.
*/
Timer.stopTimer = function() {
  clearInterval(Timer.clock);
};

/*
  This resets the time by calling the time display function with no time (everything ends up as 0s)
*/
Timer.resetTimer = function() {
  Timer.getTimerDisplay(0);
};

/*
  utility function to pad a 0 on the clock display
*/
Timer.prettyTimeString = function(num) {
  return ( num < 10 ? "0" : "" ) + num;
};

/*
  Displays the time in hh:mm:ss format. It takes an input of seconds
*/
Timer.getTimerDisplay = function(totalSeconds) {
  Timer.totalSeconds = totalSeconds;

  var timeObj = Timer.getTimeObj();

  hours = Timer.prettyTimeString(timeObj.hours);
  minutes = Timer.prettyTimeString(timeObj.minutes);
  seconds = Timer.prettyTimeString(timeObj.seconds);

  var currentTimeString = hours + ":" + minutes + ":" + seconds;

  $('#timer').text(currentTimeString);
};

/*
  Creates a time object out of the Timer.totalSeconds. This way the function to create the hours, minutes, and seconds can be reused and displayed in multiple formats.
*/
Timer.getTimeObj = function() {
  totalSeconds = Timer.totalSeconds;

  var hours = Math.floor(totalSeconds / 3600);
  totalSeconds = totalSeconds % 3600;

  var minutes = Math.floor(totalSeconds / 60);
  totalSeconds = totalSeconds % 60;

  var seconds = Math.floor(totalSeconds);

  return({hours:hours, minutes:minutes, seconds:seconds})
};
