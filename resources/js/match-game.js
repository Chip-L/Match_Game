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
  $game.data('matchCards', [])

  for (var i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="col-xs-3 card"></div>');
    $card.data('index', i);
    $card.data('value', cardValues[i]);
    $card.data('flipped', false);
    $card.data('color', colorValue[ cardValues[i] - 1 ]);
    $card.click(function (event) {
      $card = $(this);
      $game =$(this).parent();
      MatchGame.flipCard($card, $game);
    })

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
  // check if in array (-1 means not in array) or already flipped
  if (($.inArray($card.data('index'), $game.data('matchCards')) > -1) || ($card.data('flipped')) ){
    return;
  }

  // change color for flip
  $card.css('background-color', $card.data('color'));
  $card.text($card.data('value'));
  $card.data('flipped', true);

  $game.data('matchCards').push($card.data('index'));
  console.log("$game.data('matchCards') = " + $game.data('matchCards'));

  if ($game.data('matchCards').length > 1) {
    var $card1 = $game.children().filter($('.card')).eq( $game.data('matchCards')[0] );
    console.log('card1: ' + $card1.data('value') + '\ncard:  ' + $card.data('value'));

    if ($card1.data('value') === $card.data('value')) {
      $card1.css('background-color', 'rgb(153, 153, 153)');
      $card1.css('color', 'rgb(204, 204, 204)');
      $card.css('background-color', 'rgb(153, 153, 153)');
      $card.css('color', 'rgb(204, 204, 204)');
    } else {
      $card1.css('background-color', 'rgb(32, 64, 86)');
      $card1.empty();
      $card1.data('flipped', false);
      $card.css('background-color', 'rgb(32, 64, 86)');
      $card.empty();
      $card.data('flipped', false);
    }

    // reset matchCards
    $game.data('matchCards', []);
  }

};
