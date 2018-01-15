/*
  Sets up a new game after HTML document has loaded.
*/
$(document).ready( function () {
  createMenu();
  MatchGame.playGame();
} );

function createMenu() {

	$('.rule').custom_modal_box();

  // show/hide rules
  // $('.rule').click( function() {
  //   showRules();
  // } );
  //
  // $('#rule .close').click( function() {
  //   $('#rules').hide();
  // } );



  // show/hide display from menu button
  $('.settings').click( function () {
    showSettings();
  } );
};

function showRules() {
  $('#rules').show();
  // $('.settings').unbind();
  // $('.rules').click( function() {
  //   hideRules();
  // } );
  // TODO: pause timer
}

function hideRules() {
  $('#rules').hide();
  createMenu();
}

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
