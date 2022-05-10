var elem = document.getElementById("container");
console.log(elem);

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
          console.log("arriba");
          game.penguin.moveUp();
          break;
        case "ArrowRight":
          self.penguin.direction = "right";
          console.log("derecha");
          game.penguin.moveRight();
          break;
        case "ArrowDown":
          self.penguin.direction = "down";
          console.log("abajo");
          game.penguin.moveDown();
          break;
        case "ArrowLeft":
          self.penguin.direction = "left";
          console.log("izquierda");
          game.penguin.moveLeft();
          break;
        default:
          self.penguin.direction = "none";
          break;
      }
    });
  };

  //StartGame
  this.startGame = function () {
    this.mapKeys();
  };
}

//Constructor Char
function Char() {}

//Constructor Hero
function Hero() {
  this.direction = "none";
  this.speed = 3;
  this.posX = 40;
  this.posY = 40;

  this.moveUp = function () {
    this.posY -= this.speed
    console.log("arriba2")
  };
  this.moveDown = function () {
    this.posY += this.speed
    console.log("abajo2")
  };
  this.moveRight = function () {
    this.posX += this.speed
    console.log("derecha2")
  };
  this.moveLeft = function () {
    this.posX -= this.speed
    console.log("izquierda2")
  };
  this.moveNone = function () {
    this.speed = 0;
  };
  this.move = function () {
    if (this.direction === "up") this.moveUp();
    if (this.direction === "down") this.moveDown();
    if (this.direction === "left") this.moveLeft();
    if (this.direction === "right") this.moveRight();
  };
}

let game = new IcePinguin();
game.startGame();
