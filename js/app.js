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
    if(position === '#attack') { // if #attack, set player to attack, computer to defense
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
    var $userHero = $('#user-hero-select').val(); // saves the variable the user input
    for (var i = 0; i < gameVariables.heroPool.length; i++) { // iterates through hero pool
      if($userHero.toLowerCase() === gameVariables.heroPool[i]) { // if the hero the user input is found in the array
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
  // method that shows the main gain screen
  showMainGame: function() {
    // changes header text depending on player position
    if (player.position === 'attack') {
      this.changeh1('ESCORT THE PAYLOAD!');
    } else {
        this.changeh1('STOP THE PAYLOAD!');
    }
    this.changeh2('THE WORLD\'S SAFETY DEPENDS ON YOU!');
    // shows game screen
    $('.main-game').show();
  }
}
