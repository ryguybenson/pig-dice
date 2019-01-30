const maxScore = 100;



function Player() {
  this.score = 0;
  this.tempScore = 0;
}

Player.prototype.computerTurn = function() {

  var numbers = [];
  for(let i=0; i<2; ++i) {
    let number = this.computerRoll();
    numbers.push(number);
    if(number === 1) {
      break;
    }
  }
  this.score += this.tempScore;
  $("#computer-score").text(this.score);
  $("#turn").text("PLAYER'S TURN");
  $("#roll-text").text("COMPUTER ROLLED");
  $("#roll-number").text(numbers.join(", "));
  $("button").prop('disabled', false);
  if(this.isDone() === true) {
    $("#turn").text("COMPUTER WINS!");
  }
}

Player.prototype.computerRoll = function() {

  var number = Math.floor(Math.random() * 6) + 1;

  if(number !== 1) {
    this.tempScore += number;
  }
  else {
    this.tempScore = 0;
  }
  return number;
}

Player.prototype.isDone = function() {
  return (this.score > maxScore);
}


$(function(){

  var human = new Player();
  var computer = new Player();

  $("button#roll").click(function() {

    var number = Math.floor(Math.random() * 6) + 1;

    if(number !== 1) {
      human.tempScore += number;
      $("#tempScore").text("CURRENT SCORE: " + human.tempScore);
      $("#roll-text").text("YOU ROLLED");
      $("#roll-number").text(number);
    }
    else {
      human.tempScore = 0;
      $("#player-score").text(human.score);
      $("#tempScore").text("CURRENT SCORE: 0");
      $("button").prop('disabled', true);
      $("#turn").text("COMPUTER'S TURN'");
      if(human.isDone() === true) {
        $("#turn").text("HUMAN WINS!");
      }
      else {
        computer.computerTurn();
      }
    }
  });

  $("button#hold").click(function() {
    human.score += human.tempScore;
    human.tempScore = 0;
    $("#player-score").text(human.score);
    $("#tempScore").text("CURRENT SCORE: 0");
    $("button").prop('disabled', true);
    $("#turn").text("COMPUTER'S TURN");
    if(human.isDone() === true) {
      $("#turn").text("HUMAN WINS!");
    }
    else {
      computer.computerTurn();
    }
  });


});
