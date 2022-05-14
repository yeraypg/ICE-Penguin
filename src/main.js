//Constructor New Game
function IcePinguin() {
  self = this;
  this.timerId;
  this.timerEnemyMvt;
  this.btnExit = document.getElementById("btn-exit");
  this.penguin = new Hero();
  this.yeti = new Enemy();
  this.iceBlockHeight = 62;
  this.iceBlockWidth = 60;
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


  //Exit-Btn
  this.exitBtn = function() {
    this.btnExit.addEventListener("click", function(e){
      self.gameOver();
    }
  )}

  //Generate Fixed Ice Blocks 
  this.generateIceMap = function () {
    for (var i = 0; i < this.tableMap.length; i++) {
      var cell = document.querySelector(`tr#row${this.tableMap[i].row} > td#col${this.tableMap[i].col}`);      
      cell.classList.add("ice-cube");
      }
  };

  //Key-map
  this.mapKeys = function () {
    document.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "ArrowUp": self.penguin.direction = "up"; break;
        case "ArrowRight": self.penguin.direction = "right"; break;
        case "ArrowDown": self.penguin.direction = "down"; break;
        case "ArrowLeft": self.penguin.direction = "left"; break;
      }
    });
    document.addEventListener("keyup", function (e) {
      self.penguin.direction = "none";
    });
  };

  this.asignMovement = function (char) {
    switch (this[char].direction){
      case "up": game[char].moveUp(); break;
      case "down": game[char].moveDown(); break;
      case "left": game[char].moveLeft(); break;
      case "right": game[char].moveRight(); break;
      case "none": game[char].moveNone(); break;
    }

  }
  this.moveControl = function () {
    
    self.charcollision("penguin","yeti");        
    self.borderCollision("penguin");
    self.borderCollision("yeti");
    self.iceBlockCollision("penguin");
    self.iceBlockCollision("yeti");
    self.asignMovement("penguin");
    self.asignMovement("yeti");
    self.yeti.paintEnemy();
    self.penguin.paintHero();   
  };
   
  //Detect Ice Block Collision
  this.iceBlockCollision = function(char) {
    for (i = 0; i < self.tableMap.length ; i++){
      switch (self[char].direction){
        case "right":          
          if (((self[char].posX + self[char].height + self[char].speed) > ((self.tableMap[i].col) * this.iceBlockWidth)) &&
          ((self[char].posY) < (self.tableMap[i].row + 1) * this.iceBlockHeight) &&
          ((self[char].posY + self[char].height) > (self.tableMap[i].row * this.iceBlockHeight))){self[char].direction="none"};
          break;
        case "down":
          if (((self[char].posY + self[char].height + self[char].speed) > ((self.tableMap[i].row) * this.iceBlockHeight)) &&
          ((self[char].posX) < (self.tableMap[i].col + 1) * this.iceBlockWidth) && 
          ((self[char].posX + self[char].height) > (self.tableMap[i].col * this.iceBlockWidth))){self[char].direction="none"};
          break;
        case "left":
          if (((self[char].posX + self[char].height + self[char].speed) < ((self.tableMap[i].col + 1) * this.iceBlockWidth)) &&
          ((self[char].posY) < (self.tableMap[i].row + 1) * this.iceBlockHeight) &&
          ((self[char].posY + self[char].height) > (self.tableMap[i].row * this.iceBlockHeight))){self[char].direction="none"};
          break;
        case "up":
          if (((self[char].posY + self[char].speed) > ((self.tableMap[i].row + 1) * this.iceBlockHeight)) && 
          ((self[char].posX) < (self.tableMap[i].col + 1) * this.iceBlockWidth) && 
          ((self[char].posX + self[char].height) > (self.tableMap[i].col * this.iceBlockWidth))){self[char].direction="none"};
          break;        
      }
    }
  }

 // Detect Hero-Enemy Collision
 this.charcollision = function(char1, char2){
    if (self[char1].posX < self[char2].posX + self[char2].height &&
      self[char1].posX + self[char1].height > self[char2].posX &&
      self[char1].posY < self[char2].posY + self[char2].height &&
      self[char1].height + self[char1].posY > self[char2].posY ){this.gameOver()};
 }

  // Detect Border Collision 
  this.borderCollision = function (char) {
    switch (this[char].direction) {
      case "up":
        if (this[char].posY - this[char].speed > 55) {game[char].style();}
        else {game[char].stop();}
        break;
      case "right":
        if (this[char].posX + this[char].speed < 920) {game[char].style();}
        else {game[char].stop();}
        break;
      case "down":
        if (this[char].posY + self[char].height + this[char].speed < 730) {game[char].style();}
        else {game[char].stop();}
        break;
      case "left":
        if (this[char].posX - this[char].speed > 60) {game[char].style();}
        else {game[char].stop();}
        break;
      case "none":
        game[char].style();
        break;
    }
  };

  // Game Over 
this.gameOver = function() {
  clearInterval(this.timerId);
  self.penguin.direction = "dead";
  self.yeti.direction = "win";
  game.penguin.style();
  game.yeti.style();
}

  //StartGame
  this.startGame = function () {
    self.mapKeys();
    self.exitBtn();
    self.generateIceMap();
    self.yeti.movementrdm();
    this.timerId = setInterval(this.moveControl, 0.1);
  };
}

//Game
let game = new IcePinguin();
game.startGame();

