$(function() { // start window onload

  // EVENT LISTENERS
  $('.position').on('click', gameInitialization.selectPosition);

}) // end window onload

// OBJECTS

var gameVariables = {
  'payload': 0
}

var gameInitialization = {
  selectPosition: function() {
    var position = $(this).attr('id');
    if(position === '#attack') {
      player.position = 'attack';
      computer.position = 'defense';
    } else {
        computer.position = 'attack';
        player.position = 'defense';
    }
  }
}

var player = {
  'position': '',
  'hero': '',
  'health': 0,
  'accuracy': 0,
  'defense': 0,
  'ultimate': 0
}

var computer = {
  'position': '',
  'hero': '',
  'health': 0,
  'accuracy': 0,
  'defense': 0,
  'ultimate': 0
}
