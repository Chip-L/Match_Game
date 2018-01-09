var Timer = {};

Timer.startTime = new Date;
Timer.clock = "";

Timer.pretty_time_string = function(num) {
  return ( num < 10 ? "0" : "" ) + num;
};

Timer.startTimer = function() {
  Timer.startTime = new Date;

  Timer.clock = setInterval(function() {
    Timer.getDisplay(Math.round(((new Date - Timer.startTime) / 1000), 0));
  }, 1000);
}

Timer.stopTimer = function() {
  clearInterval(Timer.clock);
};

Timer.resetTimer = function() {
  Timer.getDisplay(0);
};

Timer.getDisplay = function(total_seconds) {

  // var total_seconds = (new Date - Timer.startTime) / 1000;

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
