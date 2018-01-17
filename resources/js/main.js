/*
  Sets up a new game after HTML document has loaded.
*/
$(document).ready( function () {
  createMenu();
  MatchGame.playGame();
} );

function createMenu() {
  var ruleModalOptions = {
    url: 'resources/html/rules.html',
  };
  var settingsModalOptions = {
    title: 'Settings',
  };
  var winModalOptions = {
    url: 'resources/html/win_screen.html',
  };

	$('.rule').custom_modal_box(ruleModalOptions);

  // show/hide display from menu button
  $('.settings').custom_modal_box(settingsModalOptions);

  // this is not displayed and is a placeholder for the Win dialog
  $('.win').custom_modal_box(winModalOptions);
};
