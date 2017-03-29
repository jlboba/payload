$(function() { // start window onload

  // EVENT LISTENERS
  $('.position').on('click', gameInitialization.selectPosition);
  $('#user-hero-select-submit').on('click', gameInitialization.checkHeroSelect);

}) // end window onload

// OBJECTS

// game variables object, holds general variables that aren't always specific to a certain player, most importantly the hero pool and their stats
var gameVariables = {
  'payload': 0,
  'payloadThreshold': 80,
  'heroPool': ['genji', 'pharah', 'bastion', 'mei', 'winston', 'd.va'],
  'genji': {
    'accuracy': 0.7,
    'defense': 0.3,
    'attack': 'shurikens',
    'defend': 'deflect',
    'ultimate': 'dragon blade'
  },
  'pharah': {
    'accuracy': 0.7,
    'defense': 0.3,
    'attack': 'rocket launcher',
    'defend': 'jump jet',
    'ultimate': 'barrage'
  },
  'bastion': {
    'accuracy': 0.5,
    'defense': 0.5,
    'attack': 'gattling gun',
    'defend': 'self-repair',
    'ultimate': 'tank form'
  },
  'mei': {
    'accuracy': 0.5,
    'defense': 0.5,
    'attack': 'endothermic blaster',
    'defend': 'ice block',
    'ultimate': 'blizzard'
  },
  'winston': {
    'accuracy': 0.3,
    'defense': 0.7,
    'attack': 'tesla cannon',
    'defend': 'barrier protector',
    'ultimate': 'primal rage'
  },
  'd.va': {
    'accuracy': 0.3,
    'defense': 0.7,
    'attack': 'fusion cannons',
    'defend': 'defense matrix',
    'ultimate': 'self-destruct'
  }
}

// player object
var player = {
  'position': '',
  'hero': '',
  'health': 100,
  'accuracy': 0,
  'defense': 0,
  'ultimate': 0,
  'currentMove': '',
  'damageDealt': 0,
  // player attack handler that occurs if the player clicks their hero's attack ability
  attack: function() {
    player.currentMove = 'attack'; // changes current move to attack
    var randomNum = Math.round((Math.random() * 10)) / 10; // randomizes a number between 0 and 1
    if (randomNum <= player.accuracy) { // if the random number is less than or equal to their hero's accuracy, they hit
      switch(randomNum) { // the amount of damage they deal is based on the random number that was generated
        case 0: // e.g. if the random number was 0
          player.damageDealt = 11; // they deal 1 damage
          break;
        case 0.1:
          player.damageDealt = 12;
          break;
        case 0.2:
          player.damageDealt = 13;
          break;
        case 0.3:
          player.damageDealt = 14;
          break;
        case 0.4:
          player.damageDealt = 15;
          break;
        case 0.5:
          player.damageDealt = 16;
          break;
        case 0.6:
          player.damageDealt = 17;
          break;
        case 0.7: // NOTE: only goes up to 0.7 because that is the highest possible accuracy a hero can obtain
          player.damageDealt = 18;
          break;
      }
    } else if (randomNum > player.accuracy) { // else if the random number generated is greater than their hero's accuracy, they miss
        player.damageDealt = 0;
        dom.addActions('player attacked with ' + gameVariables[player.hero].attack + ' but missed!');
      }
    computer.randomMove(); // passes to computer's randomMove method
  },
  // player defend handler that occurs if the player clicks their hero's defense ability
  defend: function() {
    player.currentMove = 'defend'; // changes current move to attack
    computer.randomMove(); // passes to computer's randomMove method
  }
}

// computer object
var computer = {
  'position': '',
  'hero': '',
  'health': 100,
  'accuracy': 0,
  'defense': 0,
  'ultimate': 0,
  'currentMove': '',
  'damageDealt': 0,
  // method that randomizes the current move for the computer (either attack or defend)
  randomMove: function() {
    // generates a number between 1-10
    var randomNum = Math.floor(Math.random() * (11 - 1)) + 1;
    if (randomNum <= 5) { // if the randomNum is 1-5, computer attacks
      this.currentMove = 'attack';
      this.attack(); // passes to the computer's attack method
      game.checkCurrentMoves(); // then passes to the game method to compare both player's current moves
    } else { // else if the randomNum is 6-10, computer defends
        this.currentMove = 'defend';
        game.checkCurrentMoves(); // then passes to the game method to compare both player's current moves
    }
  },
  // computer attack method
  attack: function() {
    // works similar to player's attack method
    var randomNum = Math.round((Math.random() * 10)) / 10;
    if (randomNum <= this.accuracy) {
      switch(randomNum) {
        case 0:
          this.damageDealt = 11;
          break;
        case 0.1:
          this.damageDealt = 12;
          break;
        case 0.2:
          this.damageDealt = 13;
          break;
        case 0.3:
          this.damageDealt = 14;
          break;
        case 0.4:
          this.damageDealt = 15;
          break;
        case 0.5:
          this.damageDealt = 16;
          break;
        case 0.6:
          this.damageDealt = 17;
          break;
        case 0.7:
          this.damageDealt = 18;
          break;
      }
    } else {
          computer.damageDealt = 0;
          dom.addActions('computer attacked with ' + gameVariables[computer.hero].attack + ' but missed!');
      }
  }
}

// game initialization object, holds all the beginning steps to determine position and hero
var gameInitialization = {
  // determines the player and computer's positions based on what button the player selected
  selectPosition: function() {
    var position = $(this).attr('id'); // checks id of button selected
    if (position === '#attack') { // if #attack, set player to attack, computer to defense
      player.position = 'attack';
      computer.position = 'defense';
      dom.hidePositionSelect(); // calls on hide position method to hide the position select screen
      // calls method to turn on only attacker buttons to prevent player from being able to click the computer's abilities
      dom.turnOnAttackerButtons();
      } else { // if #defense, set player to defense, computer to attack
        computer.position = 'attack';
        player.position = 'defense';
        dom.hidePositionSelect();
        // calls method to turn on only defender buttons to prevent player from being able to click the computer's abilities
        dom.turnOnDefenderButtons();
    }
  },
  // checks that the user input a valid hero
  checkHeroSelect: function() {
    var heroCheck = 0; // counter variable to increment below
    var $userHero = $('#user-hero-select').val().toLowerCase(); // saves the variable the user input
    for (var i = 0; i < gameVariables.heroPool.length; i++) { // iterates through hero pool
      if($userHero === gameVariables.heroPool[i]) { // if the hero the user input is found in the array
        heroCheck++; // increment the counter
      }
    } // end for loop
    if (heroCheck === 0) { // if the counter remains at 0, user input must be invalid
      dom.changeh2('THAT HERO\'S ON VACATION, TRY AGAIN!') // changes prompt to let them know
    } else { // if the counter is at 1, user input must be valid
      gameInitialization.selectHero($userHero); // passes to select hero method
    }
  },
  // sets the player's hero and takes that hero out of the available hero pool
  selectHero: function($userHero) {
    player.hero = $userHero; // sets the user's input as their hero
    player.accuracy = gameVariables[$userHero].accuracy; // sets the user's accuracy as their chosen hero's accuracy, found from the gameVariables object
    player.defense = gameVariables[$userHero].defense; // sets the user's accuracy as their chosen hero's defense
    for (var i = 0; i < gameVariables.heroPool.length; i++) { // iterates through hero pool array
      if($userHero === gameVariables.heroPool[i]) {
        gameVariables.heroPool.splice([i], 1); // splices out the hero when found
        dom.hideHeroSelect(); // calls hide hero select method to hide the screen
        this.computerHeroSelect(); // passes onto computer hero select method
      }
    }
  },
  // randomly decides a hero for the computer
  computerHeroSelect: function() {
    var randomNum = Math.floor(Math.random() * (gameVariables.heroPool.length - 1)); // randomly generates a valid index number from the hero pool
    var computerHero = gameVariables.heroPool[randomNum];
    computer.hero = computerHero; // sets the computer's hero to the randomly selected hero
    computer.accuracy = gameVariables[computerHero].accuracy; // sets computer's accuracy to the randomly selected hero's
    computer.defense = gameVariables[computerHero].defense; // sets computer's defense to the randomly selected hero's
    // shows the computer's hero picture and stats on the main game screen
    dom.showComputerHeroPic();
    dom.computerHeroStats();
    dom.showComputerHeroAbilites();
  }
}

// game object
var game = {
  // method that checks the current selected move/ability of both players
  checkCurrentMoves: function() {
    dom.turnOffButtons(); // turns off the ability buttons to prevent player from spamming clicks
    if ((player.currentMove === 'attack') && (computer.currentMove === 'attack')) { // if both players  attacked
        this.bothAttack(); // pass to bothAttack method
    } else if ((player.currentMove === 'defend') && (computer.currentMove === 'defend')) { // if both players  defended
        this.bothDefend(); // pass to bothDefend method
    } else { // else, one must be attack and one must be defend
        this.attackDefend(); // pass to attack & defend method
    }
  },
  // method that subtracts from both player's health depending on the damage dealt
  bothAttack: function() {
    player.health -= computer.damageDealt;
    computer.health -= player.damageDealt;
    dom.bothAttackActions(); // calls method to display the actions on screen
    dom.changeHealth(); // calls method to change the health displayed
    this.movePayload(); // calls method to move payload
    this.healthCheck(); // calls method to check health
    dom.turnOnPlayerButtons(); // turns on the player's buttons to allow making another choice until someone wins
  },
  // method that tells player that both defended and thus did nothing
  bothDefend: function() {
    dom.bothDefendActions();
    this.healthCheck();
    dom.turnOnPlayerButtons();
  },
  // method that runs if both players chose opposing moves (one attack, one defend)
  attackDefend: function() {
    if (player.currentMove === 'attack') { // if the player is the one who chose an attack move
      var defendedDamage = computer.defense * player.damageDealt; // calculates how much the computer defended
      var remainingDamage = Math.round(player.damageDealt - defendedDamage); // calculates the remaining damage that wasn't defended
      computer.health -= remainingDamage; // subtracts the remaining damage from the computer's health
      if (player.damageDealt > 0) {
        dom.addActions('player attacked with ' + gameVariables[player.hero].attack + '!');
        dom.addActions('but computer defended ' + Math.round(defendedDamage) + 'hp with ' + gameVariables[computer.hero].defend + '!');
        dom.addActions('computer only damaged by ' + remainingDamage + 'hp!');
      } else if (player.damageDealt === 0) {
          dom.addActions('computer defended with ' + gameVariables[computer.hero].defend + ' just in case!');
      }
      dom.displayActionsInitialization();
      dom.changeHealth(); // calls method to change the health displayed
    } else { // else if the player is the one who chose a defense move, does the reverse
        var defendedDamage = player.defense * computer.damageDealt;
        var remainingDamage = Math.round(computer.damageDealt - defendedDamage);
        player.health -= Math.round(remainingDamage);
        if (computer.damageDealt > 0) {
          dom.addActions('computer attacked with ' + gameVariables[computer.hero].attack + '!');
          dom.addActions('but player defended ' + Math.round(defendedDamage) + 'hp with ' + gameVariables[player.hero].defend + '!');
          dom.addActions('player only damaged by ' + remainingDamage + 'hp!');
        } else if (computer.damageDealt === 0) {
            dom.addActions('player defended with ' + gameVariables[player.hero].defend + ' just in case!');
        }
        dom.displayActionsInitialization();
        dom.changeHealth();
    }
    this.movePayloadDefended(); // calls the move payload defended method (moves a little less than if the attack wasn't defended)
    this.healthCheck();
    dom.turnOnPlayerButtons(); // calls turn on player buttons to allow user to choose their next move
  },
  // method to move the payload upon successful attacks from the attacker with no defense
  movePayload: function() {
    if ((player.position === 'attack') && (player.currentMove === 'attack')) {
      if (player.damageDealt > 0) {
        gameVariables.payload += 6;
        dom.translatePayload();
      }
    }
    if ((computer.position === 'attack') && (computer.currentMove === 'attack')) {
      if (computer.damageDealt > 0) {
        gameVariables.payload += 6;
        dom.translatePayload();
      }
    }
  },
  // method to move the payload upon successful attacks from attacker, but was defended a little bit
  movePayloadDefended: function() {
    if ((player.position === 'attack') && (player.currentMove === 'attack')) {
      if (player.damageDealt > 0) {
        gameVariables.payload += 4;
        dom.translatePayload();
      }
    }
    if ((computer.position === 'attack') && (computer.currentMove === 'attack')) {
      if (computer.damageDealt > 0) {
        gameVariables.payload += 4;
        dom.translatePayload();
      }
    }
  },
  // method that checks both player's health
  healthCheck: function() {
    if ((player.health > 0) && (computer.health > 0)) {
      console.log('both healthy');
      this.payloadCheck();
    } else if ((player.health > 0) && (computer.health < 0)) {
        console.log('player wins');
    } else if ((player.health < 0) && (computer.health > 0)) {
        console.log('computer wins');
    } else if ((player.health < 0) && (computer.health < 0)) {
        console.log('draw');
    }
  },
  // method that checks payload's distance
  payloadCheck: function() {
    if (gameVariables.payload === gameVariables.payloadThreshold) {
      if (player.position === 'attack') {
        console.log('player wins - payload check');
      } else if (computer.position === 'attack') {
          console.log('computer wins - payload check');
      }
    }
  }
}

// dom object
var dom = {
  // method to change h1 titles
  changeh1: function(titleText) {
    $('h1').html(titleText);
  },
  // method to change h2 titles
  changeh2: function(subTitleText) {
    $('h2').html(subTitleText);
  },
  // method that hides the position select screen and calls for method to show hero select
  hidePositionSelect: function() {
    $('.position-select').hide();
    this.showHeroSelect();
  },
  // method that shows the hero select screen
  showHeroSelect: function() {
    // changes header text
    this.changeh1('CHOOSE YOUR HERO');
    this.changeh2('TO BEGIN YOUR WATCH');
    // shows hero select screen
    $('.hero-select').show();
  },
  // method that hides the hero select screen and calls for method to show game screen
  hideHeroSelect: function() {
    $('.hero-select').hide();
    this.showMainGame();
  },
  // method that shows the main game screen
  showMainGame: function() {
    // changes header text and player info text depending on player position
    if (player.position === 'attack') {
      this.changeh1('ESCORT THE PAYLOAD!');
      $('#attack-player').html('player');
      $('#defense-player').html('computer');
    } else {
        this.changeh1('STOP THE PAYLOAD!');
        $('#attack-player').html('computer');
        $('#defense-player').html('player');
    }
    this.changeh2('THE WORLD\'S SAFETY DEPENDS ON YOU!');
    // sets player hero picture, stats, and abilities
    this.playerHeroStats();
    this.showPlayerHeroPic();
    this.showPlayerHeroAbilites();
    // shows game screen
    $('.main-game').show();
  },
  // method that sets the player's stats in the appropriate box and displays their hero's stat info depending on position
  playerHeroStats: function() {
    if (player.position === 'attack') {
      $('#attack-hero-stats').html('<strong>HERO:</strong> ' + player.hero + ' // <strong>ACC:</strong> ' + player.accuracy + ' // <strong>DEF:</strong> ' + player.defense);
    } else {
        $('#defense-hero-stats').html('<strong>HERO:</strong> ' + player.hero + ' // <strong>ACC:</strong> ' + player.accuracy + ' // <strong>DEF:</strong> ' + player.defense);
      }
  },
  // method that sets the computer's stats in the appropriate box and displays their hero's stat info depending on position
  computerHeroStats: function() {
    if (computer.position === 'attack') {
      $('#attack-hero-stats').html('<strong>HERO:</strong> ' + computer.hero + ' // <strong>ACC:</strong> ' + computer.accuracy + ' // <strong>DEF:</strong> ' + computer.defense);
    } else {
        $('#defense-hero-stats').html('<strong>HERO:</strong> ' + computer.hero + ' // <strong>ACC:</strong> ' + computer.accuracy + ' // <strong>DEF:</strong> ' + computer.defense);
    }
  },
  // method that shows the picture of the hero the player selected
  showPlayerHeroPic: function() {
    switch(player.hero) { // checks the player's selected hero
      case 'genji': // if the case matches the selected hero
        $('#genji').removeClass('hide').addClass('player-hero'); // accesses the id set in the html matching that hero, shows the photo by removing the hide class defined, then adding a class 'player-hero' to allow later access
        break;
      case 'pharah':
        $('#pharah').removeClass('hide').addClass('player-hero');
        break;
      case 'bastion':
        $('#bastion').removeClass('hide').addClass('player-hero');
        break;
      case 'mei':
        $('#mei').removeClass('hide').addClass('player-hero');
        break;
      case 'winston':
        $('#winston').removeClass('hide').addClass('player-hero');
        break;
      case 'd.va':
        $('#dva').removeClass('hide').addClass('player-hero');
        break;
    }
    // another switch statement that decides where the place the hero picture based on the player's selected position
    switch(player.position) {
      case 'attack': // if the player is on attack
        $('.player-hero').addClass('attacker'); // add the pre-defined class 'attacker' to set it in the correct position; note that it accesses the image by selecting the 'player-hero' class added in the previous switch
        break;
      case 'defense':
        $('.player-hero').addClass('defender');
        break;
    }
  },
  // method that shows the picture of the hero the computer randomly selected, works similar to the showPlayerHeroPic method
  showComputerHeroPic: function() {
    switch(computer.hero) {
      case 'genji':
        $('#genji').removeClass('hide').addClass('computer-hero');
        break;
      case 'pharah':
        $('#pharah').removeClass('hide').addClass('computer-hero');
        break;
      case 'bastion':
        $('#bastion').removeClass('hide').addClass('computer-hero');
        break;
      case 'mei':
        $('#mei').removeClass('hide').addClass('computer-hero');
        break;
      case 'winston':
        $('#winston').removeClass('hide').addClass('computer-hero');
        break;
      case 'd.va':
        $('#dva').removeClass('hide').addClass('computer-hero');
        break;
    }
    switch(computer.position) {
      case 'attack':
        $('.computer-hero').addClass('attacker');
        break;
      case 'defense':
        $('.computer-hero').addClass('defender');
        break;
    }
  },
  // method that displays the hero's abilities for the player
  showPlayerHeroAbilites: function() {
    switch(player.hero) {
      case 'genji':
        if (player.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ' + gameVariables.genji.attack);
          $('#attacker-defense').html('DEFEND: ' + gameVariables.genji.defend);
          $('#attacker-ultimate').html('ULTIMATE: ' + gameVariables.genji.ultimate);
        } else {
          $('#defender-attack').html('ATTACK: ' + gameVariables.genji.attack);
          $('#defender-defense').html('DEFEND: ' + gameVariables.genji.defend);
          $('#defender-ultimate').html('ULTIMATE: ' + gameVariables.genji.ultimate);
        }
        break;
      case 'pharah':
        if (player.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ' + gameVariables.pharah.attack);
          $('#attacker-defense').html('DEFEND: ' + gameVariables.pharah.defend);
          $('#attacker-ultimate').html('ULTIMATE: ' + gameVariables.pharah.ultimate);
        } else {
          $('#defender-attack').html('ATTACK: ' + gameVariables.pharah.attack);
          $('#defender-defense').html('DEFEND: ' + gameVariables.pharah.defend);
          $('#defender-ultimate').html('ULTIMATE: ' + gameVariables.pharah.ultimate);
        }
        break;
      case 'bastion':
        if (player.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ' + gameVariables.bastion.attack);
          $('#attacker-defense').html('DEFEND: ' + gameVariables.bastion.defend);
          $('#attacker-ultimate').html('ULTIMATE: ' + gameVariables.bastion.ultimate);
        } else {
          $('#defender-attack').html('ATTACK: ' + gameVariables.bastion.attack);
          $('#defender-defense').html('DEFEND: ' + gameVariables.bastion.defend);
          $('#defender-ultimate').html('ULTIMATE: ' + gameVariables.bastion.ultimate);
        }
        break;
      case 'mei':
        if (player.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ' + gameVariables.mei.attack);
          $('#attacker-defense').html('DEFEND: ' + gameVariables.mei.defend);
          $('#attacker-ultimate').html('ULTIMATE: ' + gameVariables.mei.ultimate);
        } else {
          $('#defender-attack').html('ATTACK: ' + gameVariables.mei.attack);
          $('#defender-defense').html('DEFEND: ' + gameVariables.mei.defend);
          $('#defender-ultimate').html('ULTIMATE: ' + gameVariables.mei.ultimate);
        }
        break;
      case 'winston':
        if (player.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ' + gameVariables.winston.attack);
          $('#attacker-defense').html('DEFEND: ' + gameVariables.winston.defend);
          $('#attacker-ultimate').html('ULTIMATE: ' + gameVariables.winston.ultimate);
        } else {
          $('#defender-attack').html('ATTACK: ' + gameVariables.winston.attack);
          $('#defender-defense').html('DEFEND: ' + gameVariables.winston.defend);
          $('#defender-ultimate').html('ULTIMATE: ' + gameVariables.winston.ultimate);
        }
        break;
      case 'd.va':
        if (player.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ' + gameVariables['d.va'].attack);
          $('#attacker-defense').html('DEFEND: ' + gameVariables['d.va'].defend);
          $('#attacker-ultimate').html('ULTIMATE: ' + gameVariables['d.va'].ultimate);
        } else {
          $('#defender-attack').html('ATTACK: ' + gameVariables['d.va'].attack);
          $('#defender-defense').html('DEFEND: ' + gameVariables['d.va'].defend);
          $('#defender-ultimate').html('ULTIMATE: ' + gameVariables['d.va'].ultimate);
        }
        break;
    }
  },
  // method that displays the hero's abilities for the computer
  showComputerHeroAbilites: function() {
    switch(computer.hero) {
      case 'genji':
        if (computer.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ' + gameVariables.genji.attack);
          $('#attacker-defense').html('DEFEND: ' + gameVariables.genji.defend);
          $('#attacker-ultimate').html('ULTIMATE: ' + gameVariables.genji.ultimate);
        } else {
          $('#defender-attack').html('ATTACK: ' + gameVariables.genji.attack);
          $('#defender-defense').html('DEFEND: ' + gameVariables.genji.defend);
          $('#defender-ultimate').html('ULTIMATE: ' + gameVariables.genji.ultimate);
        }
        break;
      case 'pharah':
        if (computer.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ' + gameVariables.pharah.attack);
          $('#attacker-defense').html('DEFEND: ' + gameVariables.pharah.defend);
          $('#attacker-ultimate').html('ULTIMATE: ' + gameVariables.pharah.ultimate);
        } else {
          $('#defender-attack').html('ATTACK: ' + gameVariables.pharah.attack);
          $('#defender-defense').html('DEFEND: ' + gameVariables.pharah.defend);
          $('#defender-ultimate').html('ULTIMATE: ' + gameVariables.pharah.ultimate);
        }
        break;
      case 'bastion':
        if (computer.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ' + gameVariables.bastion.attack);
          $('#attacker-defense').html('DEFEND: ' + gameVariables.bastion.defend);
          $('#attacker-ultimate').html('ULTIMATE: ' + gameVariables.bastion.ultimate);
        } else {
          $('#defender-attack').html('ATTACK: ' + gameVariables.bastion.attack);
          $('#defender-defense').html('DEFEND: ' + gameVariables.bastion.defend);
          $('#defender-ultimate').html('ULTIMATE: ' + gameVariables.bastion.ultimate);
        }
        break;
      case 'mei':
        if (computer.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ' + gameVariables.mei.attack);
          $('#attacker-defense').html('DEFEND: ' + gameVariables.mei.defend);
          $('#attacker-ultimate').html('ULTIMATE: ' + gameVariables.mei.ultimate);
        } else {
          $('#defender-attack').html('ATTACK: ' + gameVariables.mei.attack);
          $('#defender-defense').html('DEFEND: ' + gameVariables.mei.defend);
          $('#defender-ultimate').html('ULTIMATE: ' + gameVariables.mei.ultimate);
        }
        break;
      case 'winston':
        if (computer.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ' + gameVariables.winston.attack);
          $('#attacker-defense').html('DEFEND: ' + gameVariables.winston.defend);
          $('#attacker-ultimate').html('ULTIMATE: ' + gameVariables.winston.ultimate);
        } else {
          $('#defender-attack').html('ATTACK: ' + gameVariables.winston.attack);
          $('#defender-defense').html('DEFEND: ' + gameVariables.winston.defend);
          $('#defender-ultimate').html('ULTIMATE: ' + gameVariables.winston.ultimate);
        }
        break;
      case 'd.va':
        if (computer.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ' + gameVariables['d.va'].attack);
          $('#attacker-defense').html('DEFEND: ' + gameVariables['d.va'].defend);
          $('#attacker-ultimate').html('ULTIMATE: ' + gameVariables['d.va'].ultimate);
        } else {
          $('#defender-attack').html('ATTACK: ' + gameVariables['d.va'].attack);
          $('#defender-defense').html('DEFEND: ' + gameVariables['d.va'].defend);
          $('#defender-ultimate').html('ULTIMATE: ' + gameVariables['d.va'].ultimate);
        }
        break;
    }
  },
  // method that turns on the attacker's ability buttons and adds the class player-buttons to be accessed later
  turnOnAttackerButtons: function() {
    $('#attacker-attack').on('click', player.attack).addClass('player-buttons');
    $('#attacker-defense').on('click', player.defend).addClass('player-buttons');
  },
  // method that turns on the defender's ability buttons and adds the class player-buttons to be accessed later
  turnOnDefenderButtons: function() {
    $('#defender-attack').on('click', player.attack).addClass('player-buttons');
    $('#defender-defense').on('click', player.defend).addClass('player-buttons');
  },
  // method that turns off all ability buttons
  turnOffButtons: function() {
    $('#attacker-attack').off();
    $('#attacker-defense').off();
    $('#defender-attack').off();
    $('#defender-defense').off();
  },
  // method that turns on the player's assigned buttons
  turnOnPlayerButtons: function() {
    $('.player-buttons').eq(0).on('click', player.attack);
    $('.player-buttons').eq(1).on('click', player.defend);
  },
  // method that changes the health displayed whenever either gets hit
  changeHealth: function() {
    if (player.position === 'attack') { // if player is the attacker
      $('#attacker-health').html('<strong>HEALTH: </strong>' + player.health); // assigns player's health to the attacker side
      $('#defender-health').html('<strong>HEALTH: </strong>' + computer.health); // assigns computer's health to the defender side
    } else {
        $('#defender-health').html('<strong>HEALTH: </strong>' + player.health);
        $('#attacker-health').html('<strong>HEALTH: </strong>' + computer.health);
    }
  },
  // empty array and index number to hold the current action strings
  'currentActions': [],
  'currentActionsIndex': 0,
  // method that pushes current action strings into the empty currentActions array
  addActions: function(action) {
    this.currentActions.push(action);
  },
  // following three methods: loops through the current actions array and displays them on screen
  displayActionsInitialization: function() {
    var $actions = $('.player-actions');
    $actions.hide(); // hides the already shown text for smoother transition
    $actions.html(dom.currentActions[dom.currentActionsIndex]); // changes the html of the prompt text to show the action of the round (from the array)
    $actions.fadeIn(1000).fadeOut(1000); // fades the action in & out
    setTimeout(dom.displayActionLoop, 1000); // calls the following function to allow delay between each action displaying
  },
  displayActionLoop: function() {
    var $actions = $('.player-actions');
    dom.currentActionsIndex ++; // increases the index number
    if (dom.currentActionsIndex  >= dom.currentActions.length) { // if the index number is greater than or equal to the length of the actions array
      dom.currentActionsIndex = 0; // set the index back to zero
      dom.currentActions = []; // empty the array
      setTimeout(dom.displayDefaultPrompt, 1000); // calls displayDefaultPrompt function (outside of this loop because otherwise the animation is not smooth)
      return; // leave this loop
    } else {
      setTimeout(dom.displayActionsInitialization, 1000); // go back to the initialization function to display the next action
    }
  },
  displayDefaultPrompt: function() {
    var $actions = $('.player-actions');
    $actions.html('select your next move!').fadeIn(1000);
  },
  // displays the actions for when both players attack
  bothAttackActions: function() {
    if (player.damageDealt > 0) {
      this.addActions('player attacked with ' + gameVariables[player.hero].attack + '!');
      this.addActions('computer damaged by ' + player.damageDealt + ' hp!');
    }
    if (computer.damageDealt > 0) {
      this.addActions('computer attacked with ' + gameVariables[computer.hero].attack + '!');
      this.addActions('player damaged by ' + computer.damageDealt + ' hp!');
    }
    this.displayActionsInitialization();
  },
  // displays the actions for when both players defend
  bothDefendActions: function() {
    this.addActions('player defended with ' + gameVariables[player.hero].defend + '!');
    this.addActions('computer defended with ' + gameVariables[computer.hero].defend + '!');
    this.addActions('no one got hit!')
    this.displayActionsInitialization();
  },
  translatePayload: function() {
    $('#payload').animate({'left': gameVariables.payload + '%'}, 1000).css('z-index', '1');
  }
}
