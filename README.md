# Match_Game
A matching game. Initially done for Cadecademy

The Codecademy solution can be found in [./resources/Misc/solution](https://chip-l.github.io/Match_Game/resources/Misc/solution/index)

Recommended to do list:
* ~~Indicate that the user won when all pairs have been found~~
* ~~Add a "Restart Game" button~~
  * add fireworks to win screen
* ~~Only allow two cards to be visible at a time (currently the setTimeout allows users to click really quickly and see a few)~~
* Allow user to select from multiple board sizes
  * adjust font size to keep cards square
* Change card values to non-number values (images)
* Add score or time:
  * ~~clicks~~
  * ~~timer~~
* Add sound effects
  * flipping
  * dealing
* Add animations
  * flipping
  * dealing

## Clicks
Clicks was pretty easy. This was just doing a "global" variable to keep track of the clicks. then they are incremented on every valid click.

This brought in to effect the win screen and restart game button. Factoring the actual game play out of the document.ready function alloed the restart. I could then use the bootstrap modal dialog to create the win notification (there really isn't anyway to lose!)

## Timer
Much of this came from https://stackoverflow.com/questions/2604450/how-to-create-a-jquery-clock-timer

The time works off of the date function. This is the most accurate way to avoid drift. setInterval does not guarantee a specific time, this means the timer can jump. By using date, you are taking the time from an actual clock. It will always be correct. Again, it can jump.

2 things on this... making the getTimeObj function to return a time object with hours, minutes, and seconds. The other was to make the totalSeconds a class property. The object allows the totalSeconds to be converted in to any format that the user wants. totalSeconds is necessary so that you have access to the elapsed time after the clock has stopped.

## Only 2 cards display at a time
I fixed this by adding a for loop for immediately when the user enters the function.
```javascript
for (var i = flippedCards.length-1; i >= 0 ; i--) {
  MatchGame.showResetCard(flippedCards[i]);
  flippedCards.pop();
};
```
Notice this counts down. This is so that the pop will work. There is no need to check if the card clicked is already flipped and in the array. This will be solved by the rest of the function. Because the card is reset and removed, then if the user clicks a card that is face up, it will just be flipped back over and re-added to the queue.

## Board size
This shouldn't be that difficult. The design is the tough part. I'm thinking that this may require me to add a menu with a settings screen.
