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
    name: 'rules',
  };
  var settingsModalOptions = {
    title: 'Settings',
  };

	$('.rule').custom_modal_box(ruleModalOptions);

  // show/hide display from menu button
  $('.settings').custom_modal_box(settingsModalOptions);
};
