# OVERWATCH INITIATIVE: PAYLOAD
**Live Site:** http://jlboba.github.io/payload/

**Description:** This is a turn-based, strategic attack/defense game based off the first-person shooter game by Blizzard Entertainment: Overwatch. The user goes against a computer, choosing whether they want to attack and escort a payload to its destination, or if they want to defend and stop a payload from reaching its destination. To do so, the user gets to choose one between 6 heroes to fight for them, all of which have different statistics that make certain heroes better than others for certain situations. The user wins if they kill the computer first, or, if they're on attack, if they escort the payload to its destination. 

**How To Play:** After deciding what position you'd like to play, read through each hero's statistics because some heroes are better at attacking than they are for defending, and vice versa. Once your hero is selected, you're presented with three buttons: an attacking move, a defensive move, and an ultimate move that is locked to begin with. 
- If you're attacking, every successful hit results in moving the payload a set amount
  * If the computer defends part of your attack, the payload moves less than if your attack wasn't defended
- Regardless of your position, every successful hit also results in charging your ultimate 
  * If the computer defends part of your attack, you get less ultimate charge 
  
Once your own ultimate is charged, you can use it at any time. Depending on your hero, it will either deal a lot of undefendable damage, or allow you to push the payload a significant amount. Remember that the opposite is the same for the computer, so if you don't want the computer to charge its ultimate or move the payload as fast, try to defend every once in a while! 

**How to Read the Stats:** *Accuracy* is rated on a scale of 0-1 where the higher it is, the better the accuracy. The more accurate, the more damage that can be dealt, i.e. if a hero with 0.7 accuracy attacks and on that turn they roll 0.7, they deal 18 damage. Rolling 0.6 deals 17 damage, and so forth. *Defense* is also rated on a scale of 0-1, but acts as percentages, i.e. if the defense stat is 0.7, the hero will defend 70% of incoming damage if the defense move is selected.

**Technologies Used:** HTML, CSS, JavaScript, jQuery

**Approach Used:** To build this project, I built following the game flow and styling mobile-first. I started from the position select screen, to the hero select screen, to the main game screen where I would always start by making features functional for the player first before making them functional for the computer, then finally to the end game screen. Once the basics were done, I made adjustments to add stretch goal ideas I had in mind (ultimate abilities), then made the styling as responsive as I could in time.

**Unsolved Problems:** Responsiveness of the hero select page is buggy after changing window width from desktop -> mobile. 
