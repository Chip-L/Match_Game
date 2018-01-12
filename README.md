# Match_Game
A matching game. Initially done for Cadecademy

The Codecademy solution can be found in [./resources/Misc/solution](https://chip-l.github.io/Match_Game/resources/Misc/solution/index)

Recommended to do list:
* ~~Indicate that the user won when all pairs have been found~~
* ~~Add a "Restart Game" button~~
  * add fireworks to win screen
* Only allow two cards to be visible at a time (currently the setTimeout allows users to click really quickly and see a few)
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
I'm not sure how to do this one. The first method I've thought of doesn't seem correct:

  1. check for 2 cards when entering the flipCard function. If there are 2 cards already flipped (not matched) then immediately call the reset card function.  
    Problems:   
    * What if a user re-clicks one of the cards?
    * Is there going to be a timing issue?

  2. ???

## Board size
This shouldn't be that difficult. The design is the tough part. I'm thinking that this may require me to add a menu with a settings screen.
