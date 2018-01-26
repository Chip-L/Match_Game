var ui = {};

/*
  This will set up the site with the clicks. These could be added to the specific buttons themselves, but this ensures they actually work when loaded
*/
ui.init = function () {
  $('.rule').click(ui.showRules);
  $('.settings').click(ui.showSettings);
  $('.custom_modal_close').click(ui.closeModal);

  $(window).resize(ui.boardSize);
};

/*
  Displays the modal. callback is a function. It will execute after everything is loaded. This is a way to populate stuff in to the infused HTML.
*/
ui.openModal = function (callback) {
  $('.custom_block_page').fadeIn(600);
  $('.custom_modal_box').fadeIn(600, callback);
};

/*
  Closes the modal. This will also clear everything out of the modal so that nothing is appended and the show functions don't have to worry about it.
*/
ui.closeModal = function () {
  $('.custom_modal_box').fadeOut();
  $('.custom_block_page').fadeOut( function () {
    $('.custom_inner_modal_box').empty();
  } );
}

/******************************** Rules Dialog ********************************/
/*
  loads the rules text in to the dialog and displays it. This does not have an additional close button function.
*/
ui.showRules = function () {
  // TODO: Add Pause.
  $('.custom_inner_modal_box').load('./resources/html/rules.html');

  ui.openModal();
};

/****************************** Settings Dialog  ******************************/
/*
  Load the setting text in to the dialog and displays it. This has a separate button functionality (loaded with the button - not added later)
  This uses the callback feature of the load to set the default values of the dropdown menus
*/
ui.showSettings = function () {
  // TODO: Add Pause
  $('.custom_inner_modal_box').load('./resources/html/settings.html');

  ui.openModal( function () {
    var objRowsCols = MatchGame.getRowsCols();

    $('.rows option[value="' + objRowsCols.rows + '"]').attr("selected",true);
    $('.cols option[value="' + objRowsCols.cols + '"]').attr("selected",true);
  } );
};

/*
  This will deal with the Submit button in the dialog to update the row/column settings.
*/
ui.closeSettings = function () {
  // TODO: add warning that the existing game will be ended
  var row = $('.rows').find(":selected").val();
  var col = $('.cols').find(":selected").val();

  // console.log({rows: row, cols: col});
  MatchGame.setRowsCols({
    rows: row,
    cols: col
  });

  $('.custom_modal_close').trigger('click');
  MatchGame.playGame();
};

/**************************** Win/PlayAgain Dialog ****************************/
/*
  This shows the dialog. This won't update the text in the injection until AFTER the dialog fully loads. This causes a flash of change in the text and doesn't look very good.

  customContent is a text/html string that will be displayed (should be how well the user did)
*/
ui.showWin = function (customContnent) {
  $('.custom_inner_modal_box').html(
    '<div id="playAgain">' +
      '<h1>You win!</h1>' +
      '<h2 id="custom-content">' + customContnent + '</h2>' +
      '<button type="button" class="btn-info" onclick="ui.closeWin()">' +
        'Play Again' +
      '</button>' +
    '</div>'
  );

  ui.openModal();
}

/*
  Closes the win dialog and launches another game.
*/
ui.closeWin = function() {
  $('.custom_modal_close').trigger('click');
  MatchGame.playGame();
};

/****************************** Board functions  ******************************/
/*
  sets up the size of the board. This will set the game-row height, the card width, and the fontSize
*/
ui.boardSize = function () {
  var $board = $('.game-board');
  var maxWidth = parseInt($board.css('max-width'));
  var maxHeight = parseInt($board.css('max-height'));
  var objRowsCols = MatchGame.getRowsCols();
  var cols = objRowsCols.cols;
  var rows = objRowsCols.rows;
  var sq = 0;

  // determine the size of the square
  if((maxWidth / cols) > (maxHeight / rows)) {
    sq = maxHeight / rows;
  } else {
    sq = maxWidth / cols;
  }

  $('.game-row').css('max-height', sq);
  $('.card').css({
    'max-width': sq,
    'font-size': (sq * 0.7),
  });
};

/****************************** Helper functions ******************************/
/*
  returns the value AND unit of value as an object.
  Input:
    value: any value with a text or % at the end of the id. This can be text only. This should be a value used in CSS i.e. 1px, 1rem, auto, 80%
  Output:
    object with 2 values:
      num: a valid number or "" (really whatever is before the text recognized as the unit  'auto%' => num: 'auto')
      unit: the text at the end of the value (px, %, rem etc)
*/
ui.getValueUnit = function (value) {
  // TODO: add error checking
  var myRegEx = /[a-zA-Z]+$|%$/ ;
  var unit = myRegEx.exec(value)[0];
  var num = value.replace(unit, "");
  return({
    number: num,
    unit: unit
  });
};
