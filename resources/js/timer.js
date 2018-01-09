/*
  Much of this came from https://stackoverflow.com/questions/2604450/how-to-create-a-jquery-clock-timer

  The time works off of the date function. This is the most accurate way to avoid drift. setInterval does not gauruntee a specific time, this means the timer can jumb. By using date, you are taking the time from an actual clock. It will always be correct. Again, it can jump.
*/

var Timer = {};

Timer.startTime = new Date;
Timer.clock = ""; // stors the actual timer so that it can be stopped

/*
  The function to start keeping track of time
*/
Timer.startTimer = function() {
  Timer.startTime = new Date;

  Timer.clock = setInterval(function() {
    Timer.getDisplay(Math.round(((new Date - Timer.startTime) / 1000), 0));
  }, 1000);
}

/*
  This function stops the timer
*/
Timer.stopTimer = function() {
  clearInterval(Timer.clock);
};

/*
  This resets the time by calling the time display function with no time (everything ends up as 0s)
*/
Timer.resetTimer = function() {
  Timer.getDisplay(0);
};

/*
  utility function to pad a 0 on the clock display
*/
Timer.pretty_time_string = function(num) {
  return ( num < 10 ? "0" : "" ) + num;
};

/*
  Displays the time. It takes an input of seconds
*/
Timer.getDisplay = function(total_seconds) {

  var hours = Math.floor(total_seconds / 3600);
  total_seconds = total_seconds % 3600;

  var minutes = Math.floor(total_seconds / 60);
  total_seconds = total_seconds % 60;

  var seconds = Math.floor(total_seconds);

  hours = Timer.pretty_time_string(hours);
  minutes = Timer.pretty_time_string(minutes);
  seconds = Timer.pretty_time_string(seconds);

  var currentTimeString = hours + ":" + minutes + ":" + seconds;

  $('#timer').text(currentTimeString);
};
