/*
  Sets up a new game after HTML document has loaded.
*/
$(document).ready( function () {
  createMenu();
  MatchGame.playGame();
} );

function createMenu() {
  // show/hide rules
  $('.rule').click( function () {
    $('#rules').toggle();
    // TODO: pause timer
  } );

  // show/hide display from menu button
  $('.settings').click( function () {
    showSettings();
  } );
};

function showSettings () {
  $('#settings').show();
  $('.settings').click( function () {
    cancelSettings();
  } );
};

function cancelSettings () {
  $('#settings').hide();
  $('.settings').click( function () {
    showSettings();
  } );
  // TODO: clean up the cancellation (if needed)
}
