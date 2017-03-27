$(function() { // start window onload

  // EVENT LISTENERS
  $('.position').on('click', gameInitialization.selectPosition);
  $('#user-hero-select-submit').on('click', gameInitialization.checkHeroSelect);

}) // end window onload

// OBJECTS

// game variables object, holds general variables that aren't always specific to a certain player, most importantly the hero pool and their stats
var gameVariables = {
  'payload': 0,
  'heroPool': ['genji', 'pharah', 'bastion', 'mei', 'winston', 'd.va'],
  'genji': {
    'accuracy': 0.7,
    'defense': 0.3
  },
  'pharah': {
    'accuracy': 0.7,
    'defense': 0.3
  },
  'bastion': {
    'accuracy': 0.5,
    'defense': 0.5,
  },
  'mei': {
    'accuracy': 0.5,
    'defense': 0.5
  },
  'winston': {
    'accuracy': 0.3,
    'defense': 0.7
  },
  'd.va': {
    'accuracy': 0.3,
    'defense': 0.7
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
    } else { // if #defense, set player to defense, computer to attack
        computer.position = 'attack';
        player.position = 'defense';
        dom.hidePositionSelect();
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

// player object
var player = {
  'position': '',
  'hero': '',
  'health': 100,
  'accuracy': 0,
  'defense': 0,
  'ultimate': 0
}

// computer object
var computer = {
  'position': '',
  'hero': '',
  'health': 100,
  'accuracy': 0,
  'defense': 0,
  'ultimate': 0
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
          $('#attacker-attack').html('ATTACK: SHURIKENS');
          $('#attacker-defense').html('DEFEND: DEFLECT');
          $('#attacker-ultimate').html('ULTIMATE: DRAGON BLADE');
        } else {
          $('#defender-attack').html('ATTACK: SHURIKENS');
          $('#defender-defense').html('DEFEND: DEFLECT');
          $('#defender-ultimate').html('ULTIMATE: DRAGON BLADE');
        }
        break;
      case 'pharah':
        if (player.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ROCKET LAUNCHER');
          $('#attacker-defense').html('DEFEND: JUMP JET');
          $('#attacker-ultimate').html('ULTIMATE: BARRAGE');
        } else {
          $('#defender-attack').html('ATTACK: ROCKET LAUNCHER');
          $('#defender-defense').html('DEFEND: JUMP JET');
          $('#defender-ultimate').html('ULTIMATE: BARRAGE');
        }
        break;
      case 'bastion':
        if (player.position === 'attack') {
          $('#attacker-attack').html('ATTACK: GATTLING GUN');
          $('#attacker-defense').html('DEFEND: SELF-REPAIR');
          $('#attacker-ultimate').html('ULTIMATE: TANK FORM');
        } else {
          $('#defender-attack').html('ATTACK: GATTLING GUN');
          $('#defender-defense').html('DEFEND: SELF-REPAIR');
          $('#defender-ultimate').html('ULTIMATE: TANK FORM');
        }
        break;
      case 'mei':
        if (player.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ENDOTHERMIC BLASTER');
          $('#attacker-defense').html('DEFEND: ICE BLOCK');
          $('#attacker-ultimate').html('ULTIMATE: BLIZZARD');
        } else {
          $('#defender-attack').html('ATTACK: ENDOTHERMIC BLASTER');
          $('#defender-defense').html('DEFEND: ICE BLOCK');
          $('#defender-ultimate').html('ULTIMATE: BLIZZARD');
        }
        break;
      case 'winston':
        if (player.position === 'attack') {
          $('#attacker-attack').html('ATTACK: TESLA CANNON');
          $('#attacker-defense').html('DEFEND: BARRIER PROTECTOR');
          $('#attacker-ultimate').html('ULTIMATE: PRIMAL RAGE');
        } else {
          $('#defender-attack').html('ATTACK: TESLA CANNON');
          $('#defender-defense').html('DEFEND: BARRIER PROTECTOR');
          $('#defender-ultimate').html('ULTIMATE: PRIMAL RAGE');
        }
        break;
      case 'd.va':
        if (player.position === 'attack') {
          $('#attacker-attack').html('ATTACK: FUSION CANNONS');
          $('#attacker-defense').html('DEFEND: DEFENSE MATRIX');
          $('#attacker-ultimate').html('ULTIMATE: SELF-DESTRUCT');
        } else {
          $('#defender-attack').html('ATTACK: FUSION CANNONS');
          $('#defender-defense').html('DEFEND: DEFENSE MATRIX');
          $('#defender-ultimate').html('ULTIMATE: SELF-DESTRUCT');
        }
        break;
    }
  },
  // method that displays the hero's abilities for the computer
  showComputerHeroAbilites: function() {
    switch(computer.hero) {
      case 'genji':
        if (computer.position === 'attack') {
          $('#attacker-attack').html('ATTACK: SHURIKENS');
          $('#attacker-defense').html('DEFEND: DEFLECT');
          $('#attacker-ultimate').html('ULTIMATE: DRAGON BLADE');
        } else {
          $('#defender-attack').html('ATTACK: SHURIKENS');
          $('#defender-defense').html('DEFEND: DEFLECT');
          $('#defender-ultimate').html('ULTIMATE: DRAGON BLADE');
        }
        break;
      case 'pharah':
        if (computer.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ROCKET LAUNCHER');
          $('#attacker-defense').html('DEFEND: JUMP JET');
          $('#attacker-ultimate').html('ULTIMATE: BARRAGE');
        } else {
          $('#defender-attack').html('ATTACK: ROCKET LAUNCHER');
          $('#defender-defense').html('DEFEND: JUMP JET');
          $('#defender-ultimate').html('ULTIMATE: BARRAGE');
        }
        break;
      case 'bastion':
        if (computer.position === 'attack') {
          $('#attacker-attack').html('ATTACK: GATTLING GUN');
          $('#attacker-defense').html('DEFEND: SELF-REPAIR');
          $('#attacker-ultimate').html('ULTIMATE: TANK FORM');
        } else {
          $('#defender-attack').html('ATTACK: GATTLING GUN');
          $('#defender-defense').html('DEFEND: SELF-REPAIR');
          $('#defender-ultimate').html('ULTIMATE: TANK FORM');
        }
        break;
      case 'mei':
        if (computer.position === 'attack') {
          $('#attacker-attack').html('ATTACK: ENDOTHERMIC BLASTER');
          $('#attacker-defense').html('DEFEND: ICE BLOCK');
          $('#attacker-ultimate').html('ULTIMATE: BLIZZARD');
        } else {
          $('#defender-attack').html('ATTACK: ENDOTHERMIC BLASTER');
          $('#defender-defense').html('DEFEND: ICE BLOCK');
          $('#defender-ultimate').html('ULTIMATE: BLIZZARD');
        }
        break;
      case 'winston':
        if (computer.position === 'attack') {
          $('#attacker-attack').html('ATTACK: TESLA CANNON');
          $('#attacker-defense').html('DEFEND: BARRIER PROTECTOR');
          $('#attacker-ultimate').html('ULTIMATE: PRIMAL RAGE');
        } else {
          $('#defender-attack').html('ATTACK: TESLA CANNON');
          $('#defender-defense').html('DEFEND: BARRIER PROTECTOR');
          $('#defender-ultimate').html('ULTIMATE: PRIMAL RAGE');
        }
        break;
      case 'd.va':
        if (computer.position === 'attack') {
          $('#attacker-attack').html('ATTACK: FUSION CANNONS');
          $('#attacker-defense').html('DEFEND: DEFENSE MATRIX');
          $('#attacker-ultimate').html('ULTIMATE: SELF-DESTRUCT');
        } else {
          $('#defender-attack').html('ATTACK: FUSION CANNONS');
          $('#defender-defense').html('DEFEND: DEFENSE MATRIX');
          $('#defender-ultimate').html('ULTIMATE: SELF-DESTRUCT');
        }
        break;
    }
  },
}
