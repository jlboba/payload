$(function() { // start window onload

  // EVENT LISTENERS
  $('.position').on('click', gameInitialization.selectPosition);

}) // end window onload

// OBJECTS

// game variables object, holds general variables that aren't always specific to a certain player
var gameVariables = {
  'payload': 0
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
  }
}

// player object
var player = {
  'position': '',
  'hero': '',
  'health': 0,
  'accuracy': 0,
  'defense': 0,
  'ultimate': 0
}

// computer object
var computer = {
  'position': '',
  'hero': '',
  'health': 0,
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
  // method that hides the position select screen
  hidePositionSelect: function() {
    $('.position-select').hide();
    this.generateHeroSelect();
  },
  // method that shows/generates the hero select screen
  generateHeroSelect: function() {
    // changes header text
    this.changeh1('CHOOSE YOUR HERO');
    this.changeh2('TO BEGIN YOUR WATCH');
    // shows hero select screen
    $('.hero-select').show();
  }
}
