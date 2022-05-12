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
      var cell = document.querySelector(`tr#row${this.tableMap[i].row} > td#col${this.tableMap[i].col}`);      
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

  this.asignMovement = function () {
    switch (this.penguin.direction){
      case "up": game.penguin.moveUp(); break;
      case "down": game.penguin.moveDown(); break;
      case "left": game.penguin.moveLeft(); break;
      case "right": game.penguin.moveRight(); break;
      case "none": game.penguin.moveNone(); break;
    }

  }
  this.moveControl = function () {
   
    self.borderCollision();
    self.iceBlockCollision();
    self.asignMovement();
    self.penguin.paintHero();
    
  };

  //StartGame
  this.startGame = function () {
    self.mapKeys();
    self.generateIceMap();
    this.timerId = setInterval(this.moveControl, 50);
  };
  
  //Calculate Array Ice Block Collision
  this.calculateArrayBlockCollision = function() {
    
  }
  
  //Detect Ice Block Collision
  this.iceBlockCollision = function() {
    //console.log(self.penguin.posY + " " + self.penguin.posX)
    for (i = 0; i < self.tableMap.length ; i++){
      switch (self.penguin.direction){
        case "down":
          if (self.penguin.posY <= (self.tableMap[i].row*60) && self.penguin.posY >= ((self.tableMap[i].row-1)*60) && self.penguin.posX >= ((self.tableMap[i].col*60)-25) && self.penguin.posX <= (((self.tableMap[i].col+1)*60)-25)){self.penguin.direction="none"};
          break;
        case "up":
          if (self.penguin.posY <= ((self.tableMap[i].row+2)*60) && self.penguin.posY >= ((self.tableMap[i].row+1)*60) && self.penguin.posX >= ((self.tableMap[i].col*60)-25) && self.penguin.posX <= (((self.tableMap[i].col+1)*60)-25)){self.penguin.direction="none"};
          break;
        case "left":
          if (self.penguin.posX <= (self.tableMap[i].col*60) && self.penguin.posX >= ((self.tableMap[i].col-1)*60) && self.penguin.posY >= (((self.tableMap[i].row*60)-30)) && self.penguin.posY <= (((self.tableMap[i].row+1)*60)-11)){self.penguin.direction="none"};
          break;
        case "right":
          if (self.penguin.posX <= (self.tableMap[i].col*60) && self.penguin.posX >= ((self.tableMap[i].col-1)*60) && self.penguin.posY >= (((self.tableMap[i].row*60)-30)) && self.penguin.posY <= (((self.tableMap[i].row+1)*60)-11)){self.penguin.direction="none"};
          break;        
      }
    }
  }
 
  // Detect Border Collision
  this.borderCollision = function () {
    switch (this.penguin.direction) {
      case "up":
        if (this.penguin.posY - this.penguin.speed > 55) {
          game.penguin.herostyle();
        } else {
          game.penguin.heroStop();
        }
        break;
      case "right":
        if (this.penguin.posX + this.penguin.speed < 920) {
          game.penguin.herostyle();
        } else {
          game.penguin.heroStop();
        }
        break;
      case "down":
        if (this.penguin.posY + this.penguin.speed < 684) {
          game.penguin.herostyle();
        } else {
          game.penguin.heroStop();
        }
        break;
      case "left":
        if (this.penguin.posX - this.penguin.speed > 60) {
          game.penguin.herostyle();
        } else {
          game.penguin.heroStop();
        }
        break;
      case "none":
        game.penguin.herostyle();
        break;
    }
  };
}

//Constructor Char
function Char() {}

//Game
let game = new IcePinguin();
game.startGame();
