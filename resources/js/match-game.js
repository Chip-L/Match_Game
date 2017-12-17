var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready( function () {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
})
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
  console.log(arrRandom);
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

  for (var i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="col-xs-3 card"></div>');
    $card.data('card', {index: i,
                         value: cardValues[i],
                         flipped: false,
                         cardColor: colorValue[ cardValues[i] - 1 ]
                       });
    $game.append($card);

    // Force next columns to break to new line every 4 cards
    if( ((i + 1) % 4) === 0) {
      $game.append('<div class="w-100"></div>');
    }
  }
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};
