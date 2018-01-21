# Match_Game
A matching game. Initially done for Cadecademy

The Codecademy solution can be found in [./resources/Misc/solution](https://chip-l.github.io/Match_Game/resources/Misc/solution/index)

To do list:
- [x] ~~* complete basic game from Codecademy instructions~~ (completed Dec 20, 2017)
- [x] ~~Make rules collapsible so they fit mobile better~~ (completed Jan 6, 2018)
- [x] ~~* Indicate that the user won when all pairs have been found~~ (completed Jan 7, 2018)
- [x] ~~* Add a "Restart Game" button~~ (completed Jan 7, 2018)
  - [ ] add fireworks to win screen
- [x] ~~* Only allow two cards to be visible at a time (currently the setTimeout allows users to click really quickly and see a few)~~ (completed Jan 13, 2018)
- [ ] \* Allow user to select from multiple board sizes
  - [ ] adjust font size to keep cards square (start here: https://stackoverflow.com/questions/16056591/font-scaling-based-on-width-of-container)
- [ ] \* Change card values to non-number values (images)
- [x] ~~* Add score or time:~~
  - [x] ~~clicks~~ (completed Jan 7, 2018)
  - [x] ~~timer~~ (completed Jan 11, 2018)
- [ ] \* Add sound effects
  - [ ] flipping
  - [ ] dealing
- [ ] \* Add animations
  - [ ] flipping
  - [ ] dealing
- [ ] Make WCAG 2.0 compliant
###### * = recommended by Codecademy

## Clicks
Clicks was pretty easy. This was just doing a "global" variable to keep track of the clicks. then they are incremented on every valid click.

This brought in to effect the win screen and restart game button. Factoring the actual game play out of the document.ready function allowed the restart. I could then use the bootstrap modal dialog to create the win notification (there really isn't anyway to lose!)

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
Notice this counts down. This is so that the pop will work. This would work with splice too, but:
* if you count down and splice would just be doing the same thing as the pop function
* if you count up, then you would not use the i variable, you would just reset flippedCards[0] and splice index 0 - which is still the same as pop, just at the front.

There is no need to check if the card clicked is already flipped and in the array. This will be solved by the rest of the function. Because the card is reset and removed, then if the user clicks a card that is face up, it will just be flipped back over and re-added to the queue.

This also allows a longer display length for when the cards if the player waits for the flipping of the card. (changed from 350ms to 500ms)

Note: This works because objects (and arrays) are passed around by passing a copy of a reference. This is why the `flippedCards.push($card)` pushes on to the `$game.data('flippedCards')` array. This is also why when you do a `flippedCards = []`, the `$game.data('flippedCards')` array is not affected, and they actually seem to become separate variables at that point.

## Board size
Code wise, this shouldn't be that difficult. The design is the tough part. I'm thinking that this may require me to add a menu with a settings screen.
* Step 1: Change the left column in to a header and add a footer
  * "Match Game" will be the title.
  * In tablet+ mode, the Rules will be one menu item and then we can have a settings item (gear?)
  * In mobile, the rules and settings will go in to a hamburger menu.
  * Add a footer (put the timer in here and a link to my GitHub landing page)
* Step 2: fix the Board
  * The board needs to display entirely on the screen - always! No more scrolling to get to the cards.
  * The font in the cards needs to scale with the card size
  * Make all cards square - this will require column width and row height to be equal.
* Step 3: Code
  * create the selectors for the board: height and width - These can go from 2-12
  * on the board render make the card sizes based off of the multiples of these numbers (col-xs-12)
  * add more colors for the cards
* Step 4: Consider taking out of bootstrap.
  * At this point, Bootstrap isn't offering a lot of value. I think rows of flexboxes might work better and give more flexibility. It would also reduce the amount of html code needed to render the page.
  * this will allow more cards to display at a time (not confined to 12 across)

I had some troubles with the custom_modal_box but we finally found the problem. See https://stackoverflow.com/questions/48308960/my-remove-event-isnt-working for that discussion.

Note: adding a non-breaking space (&nbsp;) to the cards keeps them a consistent size I need a better solution than this.
