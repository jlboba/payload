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

  // OBJECTS NEEDED
    // player object && computer object
      // variables: hero, position (attack or defense), health, attack stat, defense stat, current damage, ultimate status (stretch goal)
      // methods: attack method, defense method

    // game object
      // methods: attack/defense loop, health check, payload check

    // hero object (? unsure if this should be put into another object)
      // keys would be all the heroes, values would be an object of their stats and abilities
        // e.g. 'soldier 76': { 'accuracy': 0.7, 'defense': 0.3, 'attackName': 'heavy pulse rifle', 'defenseName': 'biotic field'}

    // dom object:
      // still unsure

  // STRETCH GOALS
    // 1. Ultimate abilities
      // whenever the player succesfully attacks, increase their ultimate meter +1
      // once they hit a certain ultimate threshold, give them the option to use their ultimate
      // ultimate abilities depend on their hero
        // e.g. soldier 76's ultimate (tactical visor) is an attack that is 100% accurate and cannot be defended against, dealing a set amount of large damage
        // e.g. mei's ultimate (blizzard) is a defense move that blocks 100% of damage

    // 2. Map select
      // after choosing their position and their hero, give the player the ability to choose the map to play on
      // doesn't add any extra functionality to the game, simply changes the background of the main game screen
      // maps to offer: el dorado, watchpoint: gibraltar, route 66 (and if it's simple enough to implement, add the hybrid maps -- numbani, hollywood, king's row, eichenwalde)
        // default map i'll be using if i don't give them this ability: watchpoint: gibraltar
