// PSEUDO CODE

  // INITIALIZING THE GAME
    // give player the option if they want to attack or defend (buttons)
    // set player.position to whichever one they choose, set computer.position to the one the player didn't choose
    // once they choose a position, take away buttons and generate the hero select page
      // on hero select page:
      // display all 6 available heroes with a photo & a name
      // when they hover over a hero, show their information/stats
      // let player choose a hero by typing in the hero's name in an input form (make sure to check if the input is valid)
      // take that hero out of the hero array and then randomly selct a hero for the computer

  // THE GAME
    // once both players have a hero, take away the hero select page and generate the game page
    // attacker is on the left side, defense on the right, payload at the left end to begin with (moves by transform: translatex(#) anytime the attacker gets it to move)
    // show all 'abilities' underneath the hero picture and make the player's clickable buttons

    // prompt player to select a move (attacking or defending)
    // if they select the attack move, pass to a playerattack method that checks their hero's accuracy, calculates by math.random if they hit, then (stretch goal) if they hit, decide how much damage they do by how well their accuracy was
      // i.e. if the randomly generated accuracy = 0.7, damage = 7 or if accuracy = 0.5, damage = 5, etc.
      // pass their damage onto a variable that the overall game attack/defense loop can access
    // if they select the defense move, check their hero's defense percentage and pass it onto a variable that the overall game attack/defense loop can access

    // after they choose either move, pass onto the computer's methods
    // do the same for computer, randomly choose between attack and defense (put attack, defense in an array and randomly choose an index, maybe?)

    // once both moves are chosen, pass onto the overall game attack/defense loop
      // if both === attack, subtract the respective damages from each player, move the payload up one, then pass to health check
      // if both === defense, do nothing, pass to health check
      // if one === attack and the other === defense, calculate how much of the attacker damage that the defender defended, then subtract from the defender's hitpoints by the remaining damage then pass to health check
        // i.e. if the attacker's damage = 5, but the defender's defense is 60%, they only actually get 2 health points subtracted since 40% of 5 = 2

    // health takes precedence > payload distance (because if the payload reaches the end but the attacker dies at the same time, it's useless anyway :P), thus check health first
      // if (player.health && computer.health) > 0, pass to payload distance check
      // if player.health < 0, pass to loss screen
      // if computer.health < 0, pass to win screen

    // payload distance check
      // if payload distance = end distance, attacker wins, pass to respective end screen (loss if attacker was computer, win if attacker was player)
      // if payload distance < end distance, pass back to main game prompt
