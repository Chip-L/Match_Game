var ui = {};

ui.init = function () {
  $('.rule').click(ui.showRules);
  $('.settings').click(ui.showSettings);

  $('.custom_modal_close').click(ui.closeModal);

  ui.boardSize();
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

ui.boardSize = function () {
  var $board = $('.game-board');
  var maxWidthPx = $board.css('max-width');
  var maxHeightPx = $board.css('max-height');
  var maxWidthObj = ui.getValue(maxWidthPx);
  var maxHeightObj = ui.getValue(maxHeightPx);

  if(maxWidthObj.number > maxHeightObj.number) {
    $board.width(maxHeightPx);
  } else {
    $board.width(maxWidthPx);
  }
};

ui.getValue = function (value) {
  var myRegEx = /[a-zA-Z]+$|%$/ ;
  var unit = myRegEx.exec(value)[0];
  var num = value.replace(unit, "");
  return({number: num, unit: unit});
};
