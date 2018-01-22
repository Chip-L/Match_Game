var ui = {};

ui.init = function () {
  $('.rule').click(ui.showRules);
  $('.settings').click(ui.showSettings);

  $('.custom_modal_close').click(ui.closeModal);

  // ui.boardSize();
};

ui.openModal = function (callback) {

  $('.custom_block_page').fadeIn(600);
  $('.custom_modal_box').fadeIn(600, callback);
};

ui.closeModal = function () {
  $('.custom_modal_box').fadeOut();
  $('.custom_block_page').fadeOut( function () {
    $('.custom_inner_modal_box').empty();
  } );
}

ui.showRules = function () {
  $('.custom_inner_modal_box').load('./resources/html/rules.html');

  ui.openModal();
};

ui.showSettings = function () {
  $('.custom_inner_modal_box').load('./resources/html/settings.html');

  ui.openModal();
};

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

ui.closeWin = function() {
  $('.custom_modal_close').trigger('click');
  MatchGame.playGame();
};

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


ui.getValue = function (value) {
  var myRegEx = /[a-zA-Z]+$|%$/ ;
  var unit = myRegEx.exec(value)[0];
  var num = value.replace(unit, "");
  return({number: num, unit: unit});
};
