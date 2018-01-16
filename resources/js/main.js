/*
  Sets up a new game after HTML document has loaded.
*/
$(document).ready( function () {
  createMenu();
  // MatchGame.playGame();
} );

function createMenu() {
  var ruleModalOptions = {
    url: 'resources/html/rules.html',
		// height: '500',
		// width: '80%',
    // top: '10%',
    // left: '10%',
  };
  var settingsModalOptions = {
    Title: 'Settings',
		// height: '500',
		// width: '800'
  };

	$('.rule').custom_modal_box(ruleModalOptions);

  // show/hide display from menu button
  $('.settings').custom_modal_box(settingsModalOptions);
};
