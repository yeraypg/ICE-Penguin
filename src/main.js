//Constructor New Game
function IcePinguin() {
  self = this;
  this.timerId;
  this.penguin = new Hero();
  this.yeti = new Enemy();
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
   
    self.borderCollision("penguin");
    self.borderCollision("yeti");
    self.iceBlockCollision("penguin");
    self.iceBlockCollision("yeti");
    self.asignMovement("penguin");
    self.asignMovement("yeti");
    self.yeti.paintEnemy();
    self.penguin.paintHero();
  
    
  };

  //StartGame
  this.startGame = function () {
    self.mapKeys();
    self.generateIceMap();
    this.timerId = setInterval(this.moveControl, 10);
  };
  
  //Calculate Array Ice Block Collision
  this.calculateArrayBlockCollision = function() {
    
  }
  
  //Detect Ice Block Collision
  this.iceBlockCollision = function(char) {
    for (i = 0; i < self.tableMap.length ; i++){
      switch (self[char].direction){
        case "down":
          if (self[char].posY <= (self.tableMap[i].row*60) && self[char].posY >= ((self.tableMap[i].row-1)*60) && self[char].posX >= (((self.tableMap[i].col-1)*60)) && (self[char].posX + self[char].height) <= (((self.tableMap[i].col)*60))){self[char].direction="none"};
          break;
        case "up":
          if (self[char].posY <= ((self.tableMap[i].row+2)*60) && self[char].posY >= ((self.tableMap[i].row+1)*60) && self[char].posX >= ((self.tableMap[i].col*60)) && self[char].posX <= (((self.tableMap[i].col+1)*60))){self[char].direction="none"};
          break;
        case "left":
          if (self[char].posX <= (self.tableMap[i].col*60) && self[char].posX >= ((self.tableMap[i].col-1)*60) && self[char].posY >= (((self.tableMap[i].row*60)-30)) && self[char].posY <= (((self.tableMap[i].row+1)*60)-11)){self[char].direction="none"};
          break;
        case "right":
          if (self[char].posX <= (self.tableMap[i].col*60) && self[char].posX >= ((self.tableMap[i].col-1)*60) && self[char].posY >= (((self.tableMap[i].row*60)-30)) && self[char].posY <= (((self.tableMap[i].row+1)*60)-11)){self[char].direction="none"};
          break;        
      }
    }
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
        if (this[char].posY + this[char].speed < 684) {game[char].style();}
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
}

//Game
let game = new IcePinguin();
game.startGame();
