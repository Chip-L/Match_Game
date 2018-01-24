var MatchGame = {};

MatchGame.clickCount = 0;
MatchGame.interval; // used to track the timeout function
MatchGame.rows = 2;
MatchGame.cols = 2;

/*
  Executes the game. Sets up the board and resets the clickCount.
  Renders a 4x4 board of cards.
*/
MatchGame.playGame = function () {
  var $game = $('#game');

  MatchGame.clickCount = 0;
  Timer.resetTimer();

  var values = MatchGame.generateCardValues();

  MatchGame.renderCards(values, $game);
};

/*
  returns an object containing the rows and cols currently set
*/
MatchGame.getRowsCols = function () {
  return ({
    rows: MatchGame.rows,
    cols: MatchGame.cols,
  });
};

/*
  takes an object with rows and cols and sets the MatchGame.rows and MatchGame.cols variables
*/
MatchGame.setRowsCols = function (objRowsCols) {
  MatchGame.rows = objRowsCols.rows;
  MatchGame.cols = objRowsCols.cols;
}

/*
  Generates and returns an array of matching card values.
*/
MatchGame.generateCardValues = function () {
  var arrOrdered = [],
      arrRandom = [];

  var numCards = MatchGame.rows * MatchGame.cols;
  var numPairs = Math.trunc(numCards/2); // removes extra cards if numPairs is odd

  for(var i=0; i < numPairs; i++) {
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
  var cardIndex = 0;
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
  $game.data('flippedCards', []);

  for(var r = 0; r < MatchGame.rows; r++) {
    var $row = $('<div class="game-row"></div>');

    for (var c = 0; c < MatchGame.cols; c++) {
      var $card = $('<div class="card">&nbsp;</div>');
      if (cardIndex != cardValues.length) {
        $card.data({
          'value': cardValues[cardIndex],
          'color': colorValue[ cardValues[cardIndex] - 1 ],
          'isFlipped': false,
        });
        // assign to individual cards so the empty doesn't get it
        $card.click(function (event) {
          MatchGame.flipCard($(this), $game);
        });
      } else {
        $card.addClass('empty');
      }

      $card.appendTo($row);
      cardIndex++;
    } // end for col

    $row.appendTo($game);
  } // end for row

  // sets boardSize now that content has been added
  ui.boardSize();
};

/*
  Flips over a given card and checks to see if two cards are isFlipped over.
  Updates styles on flipped cards depending whether they are a match or not.
*/
MatchGame.flipCard = function ($card, $game) {
  var flippedCards = $game.data('flippedCards');

  // check to see if more than 2 cars are shown, then hide the 2 cards.
  if (flippedCards.length >= 2) {
    clearTimeout(MatchGame.interval);

    // flippedCards.length should never be more than 2, but just in case. Count down so that the pop will work.
    for (var i = flippedCards.length-1; i >= 0 ; i--) {
      MatchGame.showResetCard(flippedCards[i]);
      flippedCards.pop();
    };
  }

  // Check for start of game
  if (MatchGame.clickCount === 0) {
    Timer.startTimer();
  }

  if ($card.data('isFlipped')) {
    return;
  }

  // add click to count
  MatchGame.clickCount++;

  // change color for flip and add to queue
  MatchGame.showCard($card);
  flippedCards.push($card);

  // check if 2 cards match. If yes, leave cards flipped, if no, change them back to unflipped state
  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      MatchGame.showMatchedCard(flippedCards[0]);
      MatchGame.showMatchedCard(flippedCards[1]);

      MatchGame.checkWin($game);

      // reset matchCards
      $game.data('flippedCards', []);
    } else {
      MatchGame.interval = setTimeout( function () {
        MatchGame.showResetCard(flippedCards[0]);
        MatchGame.showResetCard(flippedCards[1]);

        // reset matchCards
        $game.data('flippedCards', []);
      }, 500 );
    };
  };
};

/*
  checks the number of flipped cards. If they are all flipped  then it will open the playAgain modal dialog.
*/
MatchGame.checkWin = function ($game) {
  // console.log("checkWin");
  var flipsNeeded = Math.trunc((MatchGame.rows * MatchGame.cols) / 2) * 2;
  var flippedCount = 0;

  $('.card').each( function () {
    if ($(this).data('isFlipped')) {
      flippedCount++;
    } else {
      return false;
    }
  } );

  // if win: stop timer, show win screen, increase level
  if(flippedCount === flipsNeeded) {
    Timer.stopTimer();

    ui.showWin(MatchGame.createWinDesc());

    // set next level
    (MatchGame.cols > MatchGame.rows) ? (MatchGame.rows++) : (MatchGame.cols++);
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
  var matchCss = {
    'background-color': 'rgb(153, 153, 153)',
    'color':  'rgb(204, 204, 204)'
  };
  $card.css(matchCss);
};

/*
  Changes the color and attributes of a that has been NOT matched
*/
MatchGame.showResetCard = function ($card) {
  $card.css('background-color', 'rgb(32, 64, 86)')
       .html('&nbsp;')
       .data('isFlipped', false);
};

/*
  create the description for the win box This is mostly just to move it out of the way of the functional code.The idea is its easier to maintain here and cleaner.
*/
MatchGame.createWinDesc = function() {
  var t = Timer.getTimeObj();
  var displayText ='On a ' + MatchGame.cols + 'X' + MatchGame.rows +
  ' board, it took you ' + MatchGame.clickCount + ' clicks in ';

  if(t.hours > 0) {
    displayText += t.hours + ' hours, ';
  }
  if((t.minutes > 0) || (t.hours > 0)) { // minutes can = 0 while hours != 0
    displayText += t.minutes + ' minutes and ';
  }
  displayText += t.seconds + ' seconds ';

  displayText += ' to beat the game.';

  return (displayText);
}
