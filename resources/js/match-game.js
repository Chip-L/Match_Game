var MatchGame = {};

MatchGame.clickCount = 0;

/*
  Sets up a new game after HTML document has loaded.
*/
$(document).ready( function () {
  MatchGame.playGame();
});

/*
  Executes the game. Sets up the board and resets the clickCount.
  Renders a 4x4 board of cards.
*/
MatchGame.playGame = function () {
  var $game = $('#game');
  MatchGame.clickCount = 0;
  var values = MatchGame.generateCardValues();

  MatchGame.renderCards(values, $game);
}

/*
  Generates and returns an array of matching card values.
*/
MatchGame.generateCardValues = function () {
  var arrOrdered = [],
      arrRandom = [];

  for(var i=0; i<8; i++) {
    arrOrdered.push(i + 1);
    arrOrdered.push(i + 1);
  }

  while (arrOrdered.length > 0) {
    var index = Math.floor(Math.random() * arrOrdered.length);
    arrRandom.push(arrOrdered[index]);
    arrOrdered.splice(index, 1);
  }
  // console.log(arrRandom);
  return(arrRandom);
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/
MatchGame.renderCards = function(cardValues, $game) {
  var colorValue = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'
  ];

  $game.empty();
  $game.data('matchCardsIdx', null); // null = not set

  for (var i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="col-xs-3 card"></div>');
    $card.data('index', i);
    $card.data('value', cardValues[i]);
    $card.data('color', colorValue[ cardValues[i] - 1 ]);
    $card.data('isFlipped', false);

    $game.append($card);
  }

  // appends to ALL cards at the same time
  $('.card').click(function (event) {
    MatchGame.flipCard($(this), $game);
  })
};

/*
  Flips over a given card and checks to see if two cards are isFlipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */
MatchGame.flipCard = function($card, $game) {
  var card0Index = $game.data('matchCardsIdx');

  // check if already selected or already flipped (don't count click)
  if (($card.data('index') === card0Index) || $card.data('isFlipped')) {
    return;
  }

  MatchGame.clickCount += 1;
  // console.log("clickCount: " + MatchGame.clickCount);

  // change color for flip
  MatchGame.showCard($card);

  // check for match - if matchCardsIdx = null - it is not set, set if it is not null, then go and reteive the other card and check the values.
  if (card0Index === null) {
    $game.data('matchCardsIdx', $card.data('index'));

    // console.log("$game.data('matchCardsIdx') = " + $game.data('matchCardsIdx'));
  } else {
    var $card0 = $('.card').eq(card0Index);

    // console.log('card0: ' + $card0.data('value') + '\ncard:  ' + $card.data('value'));
    if ($card0.data('value') === $card.data('value')) {
        MatchGame.showMatchedCard($card0);
        MatchGame.showMatchedCard($card);

        MatchGame.checkWin($game);
    } else {
      setTimeout(function () {
        MatchGame.showResetCard($card0);
        MatchGame.showResetCard($card);
      }, 350);
    }

    // reset matchCards
    $game.data('matchCardsIdx', null);
  }
};

/*
  checks the number of flipped cards. If they are all flipped  then it will open the playAgain modal dialog.
*/
MatchGame.checkWin = function ($game) {
  console.log("checkWin");

  var flippedCount = 0;

  $('.card').each( function () {
    if ($(this).data('isFlipped')) {
      flippedCount++;
    } else {
      // return false;
    }
  } );

  if(flippedCount > 0) {
  // if(flippedCount === 16) {
    var response = false;
    setTimeout( function () {
      $('#playAgain .modal-body').empty().append(
        '<h2>It took you ' + MatchGame.clickCount + ' clicks to beat the game.</h2>'
      );
      $('#playAgain').modal('show');
    }, 500);
  }
} // end MatchGame.checkWin

/*
  Changes the color and attributes of a card being shown (not matched - yet)
*/
MatchGame.showCard = function ($card) {
  $card.css('background-color', $card.data('color'))
       .text($card.data('value'))
       .data('isFlipped', true);
};

/*
  Changes the color and attributes of a that has been matched
*/
MatchGame.showMatchedCard = function ($card) {
  $card.css('background-color', 'rgb(153, 153, 153)')
       .css('color', 'rgb(204, 204, 204)');
  console.log('showMatchedCard = done');
};

/*
  Changes the color and attributes of a that has been NOT matched
*/
MatchGame.showResetCard = function ($card) {
  $card.css('background-color', 'rgb(32, 64, 86)')
       .text('')
       .data('isFlipped', false);
};
