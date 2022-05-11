//Constructor New Game
function IcePinguin() {
  self = this;
  this.timerId;
  this.penguin = new Hero();
  this.tableMap = [
    { row: 2, col: 2 },
    { row: 2, col: 4 },
    { row: 2, col: 6 },
    { row: 2, col: 8 },
    { row: 2, col: 10 },
    { row: 2, col: 12 },
    { row: 2, col: 14 },
    { row: 4, col: 2 },
    { row: 4, col: 4 },
    { row: 4, col: 6 },
    { row: 4, col: 8 },
    { row: 4, col: 10 },
    { row: 4, col: 12 },
    { row: 4, col: 14 },
    { row: 6, col: 2 },
    { row: 6, col: 4 },
    { row: 6, col: 6 },
    { row: 6, col: 8 },
    { row: 6, col: 10 },
    { row: 6, col: 12 },
    { row: 6, col: 14 },
    { row: 8, col: 2 },
    { row: 8, col: 4 },
    { row: 8, col: 6 },
    { row: 8, col: 8 },
    { row: 8, col: 10 },
    { row: 8, col: 12 },
    { row: 8, col: 14 },
    { row: 10, col: 2 },
    { row: 10, col: 4 },
    { row: 10, col: 6 },
    { row: 10, col: 8 },
    { row: 10, col: 10 },
    { row: 10, col: 12 },
    { row: 10, col: 14 },
  ];
  //Generate Fixed Ice Blocks 
  this.generateIceMap = function () {
    for (var i = 0; i < this.tableMap.length; i++) {
      var cell = document.querySelector(
        `tr#row${this.tableMap[i].row} > td#col${this.tableMap[i].col}`
      );
      console.log(
        `tr#row${this.tableMap[i].row} > td#col${this.tableMap[i].col}`
      );
      cell.classList.add("bloquehielo");
      }
  };

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
    self.generateIceMap();
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
        } else {
          game.penguin.heroStop();
        }
        break;
      case "right":
        if (this.penguin.posX + this.penguin.speed < 920) {
          game.penguin.moveRight();
          game.penguin.hero.style.backgroundImage =
            "url(/source/graphics/penguiright.png)";
        } else {
          game.penguin.heroStop();
        }
        break;
      case "down":
        if (this.penguin.posY + this.penguin.speed < 684) {
          game.penguin.moveDown();
          game.penguin.hero.style.backgroundImage =
            "url(/source/graphics/penguidown.png)";
        } else {
          game.penguin.heroStop();
        }
        break;
      case "left":
        if (this.penguin.posX - this.penguin.speed > 60) {
          game.penguin.moveLeft();
          game.penguin.hero.style.backgroundImage =
            "url(/source/graphics/penguileft.png)";
        } else {
          game.penguin.heroStop();
        }
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
