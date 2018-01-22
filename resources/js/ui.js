var ui = {};

ui.init = function () {
  $('.rule').click(ui.showRules);
  $('.settings').click(ui.showSettings);

  $('.custom_modal_close').click(ui.closeModal);
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
  // https://stackoverflow.com/questions/48308960/my-remove-event-isnt-working
  // $('.custom_modal_close').triggerHandler('click').then(function() {
  //      MatchGame.playGame();
  //  });

  $('.custom_modal_close').trigger('click');
  MatchGame.playGame();
}
