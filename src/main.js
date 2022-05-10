var elem = document.getElementById("hero");

//Constructor New Game
function IcePinguin() {
  self = this;
  this.timerId;
  this.penguin = new Hero();

  //Key-map
  this.mapKeys = function () {
    document.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "ArrowUp":
          self.penguin.direction = "up";
          game.penguin.moveUp();
          break;
        case "ArrowRight":
          self.penguin.direction = "right";
          game.penguin.moveRight();
          break;
        case "ArrowDown":
          self.penguin.direction = "down";
          game.penguin.moveDown();
          break;
        case "ArrowLeft":
          self.penguin.direction = "left";
          game.penguin.moveLeft();
          break;
        
      }
    });
    document.addEventListener("keyup", function (e){
      game.penguin.moveNone();

    })
  };

  //StartGame
  this.startGame = function () {
    this.mapKeys();
  };
}

//Constructor Char
function Char() {}


//Game
let game = new IcePinguin();
game.startGame();
