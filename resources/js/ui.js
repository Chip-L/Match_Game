var ui = {};

ui.init = function () {
  $('.rule').click(ui.showRules);
  $('.settings').click(ui.showSettings);

  $('.custom_modal_close').click(ui.closeModal);
};

ui.openModal = function () {
  $('.custom_block_page').fadeIn(600);
  $('.custom_modal_box').fadeIn(600);
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
