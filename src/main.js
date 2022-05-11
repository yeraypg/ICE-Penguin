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
    document.addEventListener("keyup", function (e) {
      game.penguin.moveNone();
    });
  };

  this.moveControl = function () {
    game.penguin.paintHero();
  };

  //StartGame
  this.startGame = function () {
    self.mapKeys();
    this.moveControl();
  };
}

//Constructor Char
function Char() {}

//Game
let game = new IcePinguin();
this.timerId = setInterval(this.startGame(), 100);
