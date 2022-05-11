//Constructor New Game
function IcePinguin() {
  self = this;
  this.timerId;
  this.penguin = new Hero();
  this.tableMap = [{row: 2, col: 2},{row: 2, col: 4},{row: 2, col: 6},{row: 2, col: 8},{row: 2, col: 10},{row: 2, col: 12},{row: 2, col: 14}];
  console.log(this.tableMap[3]);
  //Key-map
  this.mapKeys = function () {
    document.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "ArrowUp":
          self.penguin.direction = "up";
          break;
        case "ArrowRight":
          self.penguin.direction = "right";
          break;
        case "ArrowDown":
          self.penguin.direction = "down";
          break;
        case "ArrowLeft":
          self.penguin.direction = "left";
          break;
      }
    });
    document.addEventListener("keyup", function (e) {
      self.penguin.direction = "none";
    });
  };

  this.moveControl = function () {
    self.borderCollision();
    game.penguin.paintHero();
  };

  //StartGame
  this.startGame = function () {
    self.mapKeys();
    this.timerId = setInterval(this.moveControl, 50);
  };

  // Detectar colisión con los bordes
  this.borderCollision = function () {
    switch (this.penguin.direction) {
      case "up":
        if (this.penguin.posY - this.penguin.speed > 55) {
          game.penguin.moveUp();
          game.penguin.hero.style.backgroundImage =
            "url(/source/graphics/penguiup.png)";
        } else {game.penguin.heroStop()}
        break;
      case "right":
        if (this.penguin.posX + this.penguin.speed < 920) {
          game.penguin.moveRight();
          game.penguin.hero.style.backgroundImage =
            "url(/source/graphics/penguiright.png)";
        } else {game.penguin.heroStop()}
        break;
      case "down":
        if (this.penguin.posY + this.penguin.speed < 720) {
          game.penguin.moveDown();
          game.penguin.hero.style.backgroundImage =
            "url(/source/graphics/penguidown.png)";
        } else {game.penguin.heroStop()}
        break;
      case "left":
        if (this.penguin.posX - this.penguin.speed > 60) {
          game.penguin.moveLeft();
          game.penguin.hero.style.backgroundImage =
            "url(/source/graphics/penguileft.png)";
        } else {game.penguin.heroStop()}
        break;
      case "none":
        game.penguin.hero.style.backgroundImage =
          "url(/source/graphics/penguistop.png)";
        break;
    }
  };
}

//Constructor Char
function Char() {}

//Game
let game = new IcePinguin();
game.startGame();
