/*
  Sets up a new game after HTML document has loaded.
*/
$(document).ready( function () {
  createMenu();
  MatchGame.playGame();
});

function createMenu() {
  $(".rule").click(function(){
    $("#rules").toggle();
    // TODO: pause timer
  });
}
