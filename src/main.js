var btnMain = document.getElementById("btn-main");
musicini = new Audio("./assets/sounds/iceland.mp3");
//Constructor New Game
function IcePinguin() {
  self = this;
  this.bombCounter = 0;
  this.map = document.getElementById("map");
  this.main = document.getElementById("main");
  this.container = document.getElementById("container");
  this.btnExit = document.getElementById("btn-exit");
  this.gameStatus;
  this.timerId;
  this.timerBlowBomb;
  this.timerExpandBomb;
  this.penguin = new Hero();  
  this.yeti4 = new Enemy (240, 360);
  this.yeti3 = new Enemy (360, 360);
  this.yeti2 = new Enemy(600, 360);
  this.yeti = new Enemy(480, 360);
  this.bombs = new Array();
  this.iceBlockHeight = 62;
  this.iceBlockWidth = 60;
  //Music and sound FX
  this.gameMusic = new Audio("./assets/sounds/musicgame.ogg");
  this.herodead = new Audio("./assets/sounds/herodead.mp3");
  this.audiobtn = new Audio("./assets/sounds/clickbutton.wav");
  this.herowin = new Audio("./assets/sounds/musicwin.wav");
  this.placeBomb = new Audio("./assets/sounds/placebomb.ogg");
  this.blowBomb = new Audio("./assets/sounds/blowbomb.mp3");
  this.yetidead = new Audio("./assets/sounds/yetidead1.mp3")

  // Ice-Block Map Position
  this.tableMap = [
    { posX: 60, posY: 60 },
    { posX: 180, posY: 60 },
    { posX: 300, posY: 60 },
    { posX: 420, posY: 60 },
    { posX: 540, posY: 60 },
    { posX: 660, posY: 60 },
    { posX: 780, posY: 60 },
    { posX: 60, posY: 180 },
    { posX: 180, posY: 180 },
    { posX: 300, posY: 180 },
    { posX: 420, posY: 180 },
    { posX: 540, posY: 180 },
    { posX: 660, posY: 180 },
    { posX: 780, posY: 180 },
    { posX: 60, posY: 300 },
    { posX: 180, posY: 300 },
    { posX: 300, posY: 300 },
    { posX: 420, posY: 300 },
    { posX: 540, posY: 300 },
    { posX: 660, posY: 300 },
    { posX: 780, posY: 300 },
    { posX: 60, posY: 420 },
    { posX: 180, posY: 420 },
    { posX: 300, posY: 420 },
    { posX: 420, posY: 420 },
    { posX: 540, posY: 420 },
    { posX: 660, posY: 420 },
    { posX: 780, posY: 420 },
    { posX: 60, posY: 540 },
    { posX: 180, posY: 540 },
    { posX: 300, posY: 540 },
    { posX: 420, posY: 540 },
    { posX: 540, posY: 540 },
    { posX: 660, posY: 540 },
    { posX: 780, posY: 540 },
  ];

  //Exit-Btn
  this.exitBtn = function () {
    this.btnExit.addEventListener("click", function (e) {
      game.audiobtn.play();
      clearInterval(self.timerId);
      clearInterval(self.yeti.timerEnemyMvt);
      clearInterval(self.yeti2.timerEnemyMvt);
      clearInterval(self.yeti3.timerEnemyMvt);
      clearInterval(self.yeti4.timerEnemyMvt);
      clearInterval(self.timerBlowBomb);
      clearInterval(self.timerExpandBomb);
      musicini.pause();
      self.gameMusic.pause();
      self.main.style.backgroundImage =
        "url(./assets/graphics/fondoinicio.png)";
      self.container.style.display = "none";
      self.main.style.display = "block";
      game.penguin.deleteHero();
      game.yeti.deleteEnemy();
      game.yeti2.deleteEnemy();
      game.yeti3.deleteEnemy();
      game.yeti4.deleteEnemy();
    });
  };

  //Generate Fixed Ice Blocks
  this.generateIceMap = function () {
    for (var i = 0; i < this.tableMap.length; i++) {
      var newdiv = document.createElement("div");
      newdiv.id = "block" + i;
      newdiv.style.position = "absolute";
      newdiv.classList.add("ice-cube");
      newdiv.style.top = this.tableMap[i].posY + "px";
      newdiv.style.left = this.tableMap[i].posX + "px";
      map.appendChild(newdiv);
    }
  };

  //BOMB CODE
  this.generateBomb = function () {
    var bomb = new Bomb(self.penguin.posX, self.penguin.posY, this.bombCounter);
    self.bombs.push(bomb);
    this.styleBomb();
  };

  this.styleBomb = function () {
    var divBomb = document.createElement("div");
    divBomb.id = "bomb" + this.bombCounter;
    divBomb.classList.add("bomb");
    divBomb.style.position = "absolute";
    divBomb.style.top = self.penguin.posY + 10 + "px";
    divBomb.style.left = self.penguin.posX + 5 + "px";
    this.map.appendChild(divBomb);
    this.bombCounter++;
    timerBlowBomb = setTimeout(function () {
      self.exploteBomb(self.bombCounter);
    }, 2000);
  };

  this.exploteBomb = function (i) {
    this.expandBombUp(i);
    this.expandBombDown(i);
    this.expandBombLeft(i);
    this.expandBombRight(i);
    this.blowBomb.play();
    this.removeBomb(self.bombs[0].divId);
  };

  this.deleteExpand = function (i) {
    remove = document.getElementById(i);
    map.removeChild(remove);
  };

  this.expandBombUp = function (i) {
    var bombExpand = document.createElement("div");
    bombExpand.id = "expandUp" + i;
    bombExpand.classList.add("bomb-expand-up");
    bombExpand.style.top = self.bombs[0].posY - 180 + "px";
    bombExpand.style.left = self.bombs[0].posX + "px";
    if (self.bombs[0].posY > 60) {
      this.map.appendChild(bombExpand);
      if (
        self.yeti.posX < self.bombs[0].posX + 50 &&
        self.yeti.posX + self.yeti.height > self.bombs[0].posX &&
        self.yeti.posY + self.yeti.height > self.bombs[0].posY - 180 &&
        self.yeti.posY < self.bombs[0].posY
      ) {
        self.gameWin("yeti");
      }
      if (
        self.yeti2.posX < self.bombs[0].posX + 50 &&
        self.yeti2.posX + self.yeti2.height > self.bombs[0].posX &&
        self.yeti2.posY + self.yeti2.height > self.bombs[0].posY - 180 &&
        self.yeti2.posY < self.bombs[0].posY
      ) {
        self.gameWin("yeti2");
      }
      if (
        self.yeti3.posX < self.bombs[0].posX + 50 &&
        self.yeti3.posX + self.yeti3.height > self.bombs[0].posX &&
        self.yeti3.posY + self.yeti3.height > self.bombs[0].posY - 180 &&
        self.yeti3.posY < self.bombs[0].posY
      ) {
        self.gameWin("yeti3");
      }

      if (
        self.yeti4.posX < self.bombs[0].posX + 50 &&
        self.yeti4.posX + self.yeti4.height > self.bombs[0].posX &&
        self.yeti4.posY + self.yeti4.height > self.bombs[0].posY - 180 &&
        self.yeti4.posY < self.bombs[0].posY
      ) {
        self.gameWin("yeti4");
      }

      timerExpandBomb = setTimeout(function () {
        self.deleteExpand(bombExpand.id);
      }, 1000);
    }
  };

  this.expandBombDown = function (i) {
    var bombExpand = document.createElement("div");
    bombExpand.id = "expandDown" + i;
    bombExpand.classList.add("bomb-expand-up");
    bombExpand.style.top = self.bombs[0].posY + 35 + "px";
    bombExpand.style.left = self.bombs[0].posX + "px";
    if (self.bombs[0].posY < 590) {
      this.map.appendChild(bombExpand);
      if (
        self.yeti.posX < self.bombs[0].posX + 50 &&
        self.yeti.posX + self.yeti.height > self.bombs[0].posX &&
        self.yeti.posY < self.bombs[0].posY + 240 &&
        self.yeti.posY > self.bombs[0].posY
      ) {
        self.gameWin("yeti");
      }
      if (
        self.yeti2.posX < self.bombs[0].posX + 50 &&
        self.yeti2.posX + self.yeti2.height > self.bombs[0].posX &&
        self.yeti2.posY < self.bombs[0].posY + 240 &&
        self.yeti2.posY > self.bombs[0].posY
      ) {
        self.gameWin("yeti2");
      }

      if (
        self.yeti3.posX < self.bombs[0].posX + 50 &&
        self.yeti3.posX + self.yeti3.height > self.bombs[0].posX &&
        self.yeti3.posY < self.bombs[0].posY + 240 &&
        self.yeti3.posY > self.bombs[0].posY
      ) {
        self.gameWin("yeti3");
      }

      if (
        self.yeti4.posX < self.bombs[0].posX + 50 &&
        self.yeti4.posX + self.yeti4.height > self.bombs[0].posX &&
        self.yeti4.posY < self.bombs[0].posY + 240 &&
        self.yeti4.posY > self.bombs[0].posY
      ) {
        self.gameWin("yeti4");
      }

      timerExpandBomb = setTimeout(function () {
        self.deleteExpand(bombExpand.id);
      }, 1000);
    }
  };

  this.expandBombLeft = function (i) {
    var bombExpand = document.createElement("div");
    bombExpand.id = "expandLeft" + i;
    bombExpand.classList.add("bomb-expand-left");
    bombExpand.style.top = self.bombs[0].posY - 12 + "px";
    bombExpand.style.left = self.bombs[0].posX - 180 + "px";
    if (self.bombs[0].posX > 60) {
      this.map.appendChild(bombExpand);
      if (
        self.yeti.posX > self.bombs[0].posX - 180 &&
        self.yeti.posY + self.yeti.height > self.bombs[0].posY &&
        self.yeti.posY < self.bombs[0].posY + 60 &&
        self.yeti.posX < self.bombs[0].posX
      ) {
        self.gameWin("yeti");
      }
      if (
        self.yeti2.posX > self.bombs[0].posX - 180 &&
        self.yeti2.posY + self.yeti2.height > self.bombs[0].posY &&
        self.yeti2.posY < self.bombs[0].posY + 60 &&
        self.yeti2.posX < self.bombs[0].posX
      ) {
        self.gameWin("yeti2");
      }
      if (
        self.yeti3.posX > self.bombs[0].posX - 180 &&
        self.yeti3.posY + self.yeti3.height > self.bombs[0].posY &&
        self.yeti3.posY < self.bombs[0].posY + 60 &&
        self.yeti3.posX < self.bombs[0].posX
      ) {
        self.gameWin("yeti3");
      }
      if (
        self.yeti4.posX > self.bombs[0].posX - 180 &&
        self.yeti4.posY + self.yeti4.height > self.bombs[0].posY &&
        self.yeti4.posY < self.bombs[0].posY + 60 &&
        self.yeti4.posX < self.bombs[0].posX
      ) {
        self.gameWin("yeti4");
      }

      timerExpandBomb = setTimeout(function () {
        self.deleteExpand(bombExpand.id);
      }, 1000);
    }
  };

  this.expandBombRight = function (i) {
    var bombExpand = document.createElement("div");
    bombExpand.id = "expandRight" + i;
    bombExpand.classList.add("bomb-expand-left");
    bombExpand.style.top = self.bombs[0].posY - 12 + "px";
    bombExpand.style.left = self.bombs[0].posX + 60 + "px";
    if (self.bombs[0].posX < 820) {
      this.map.appendChild(bombExpand);
      if (
        self.yeti.posX < self.bombs[0].posX + 240 &&
        self.yeti.posY + self.yeti.height > self.bombs[0].posY &&
        self.yeti.posY < self.bombs[0].posY + 60 &&
        self.yeti.posX + self.yeti.height > self.bombs[0].posX
      ) {
        self.gameWin("yeti");
      }
      if (
        self.yeti2.posX < self.bombs[0].posX + 240 &&
        self.yeti2.posY + self.yeti2.height > self.bombs[0].posY &&
        self.yeti2.posY < self.bombs[0].posY + 60 &&
        self.yeti2.posX + self.yeti2.height > self.bombs[0].posX
      ) {
        self.gameWin("yeti2");
      }
      if (
        self.yeti3.posX < self.bombs[0].posX + 240 &&
        self.yeti3.posY + self.yeti3.height > self.bombs[0].posY &&
        self.yeti3.posY < self.bombs[0].posY + 60 &&
        self.yeti3.posX + self.yeti3.height > self.bombs[0].posX
      ) {
        self.gameWin("yeti3");
      }
      if (
        self.yeti4.posX < self.bombs[0].posX + 240 &&
        self.yeti4.posY + self.yeti4.height > self.bombs[0].posY &&
        self.yeti4.posY < self.bombs[0].posY + 60 &&
        self.yeti4.posX + self.yeti4.height > self.bombs[0].posX
      ) {
        self.gameWin("yeti4");
      }

      timerExpandBomb = setTimeout(function () {
        self.deleteExpand(bombExpand.id);
      }, 1000);
    }
  };

  this.removeBomb = function (id) {
    remove = document.getElementById("bomb" + id);
    map.removeChild(remove);
    self.bombs.shift();
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
        case " ":
          self.generateBomb();
          self.placeBomb.play();
          break;
      }
    });
    document.addEventListener("keyup", function (e) {
      self.penguin.direction = "none";
    });
  };

  this.asignMovement = function (char) {
    switch (this[char].direction) {
      case "up":
        game[char].moveUp();
        break;
      case "down":
        game[char].moveDown();
        break;
      case "left":
        game[char].moveLeft();
        break;
      case "right":
        game[char].moveRight();
        break;
      case "none":
        game[char].moveNone();
        break;
    }
  };
  this.moveControl = function () {
    self.charCollision("penguin", "yeti");
    self.charCollision("penguin", "yeti2");
    self.charCollision("penguin", "yeti3");
    self.charCollision("penguin", "yeti4");
    self.borderCollision("penguin");
    self.borderCollision("yeti");
    self.borderCollision("yeti2");
    self.borderCollision("yeti3");
    self.borderCollision("yeti4");
    self.iceBlockCollision("penguin");
    self.iceBlockCollision("yeti2");
    self.iceBlockCollision("yeti3");
    self.iceBlockCollision("yeti4");
    self.iceBlockCollision("yeti");
    self.asignMovement("penguin");
    self.asignMovement("yeti");
    self.asignMovement("yeti2");
    self.asignMovement("yeti3");
    self.asignMovement("yeti4");
    self.penguin.paintHero();
    self.yeti.paintEnemy();
    self.yeti2.paintEnemy();
    self.yeti3.paintEnemy();
    self.yeti4.paintEnemy();
  };

  //Detect Ice Block Collision
  this.iceBlockCollision = function (char) {
    for (i = 0; i < self.tableMap.length; i++) {
      switch (self[char].direction) {
        case "right":
          if (
            self[char].posX + self[char].height + self[char].speed >
              self.tableMap[i].posX &&
            self[char].posY + self[char].height > self.tableMap[i].posY &&
            self[char].posY < self.tableMap[i].posY + this.iceBlockHeight
          ) {
            self[char].direction = "none";
          }
          break;
        case "down":
          if (
            self[char].posY + self[char].height + self[char].speed >
              self.tableMap[i].posY &&
            self[char].posX < self.tableMap[i].posX + this.iceBlockWidth &&
            self[char].posX + self[char].height > self.tableMap[i].posX
          ) {
            self[char].direction = "none";
          }
          break;
        case "left":
          if (
            self[char].posX + self[char].speed <
              self.tableMap[i].posX + this.iceBlockWidth &&
            self[char].posY + self[char].height > self.tableMap[i].posY &&
            self[char].posY < self.tableMap[i].posY + this.iceBlockHeight
          ) {
            self[char].direction = "none";
          }
          break;
        case "up":
          if (
            self[char].posY + self[char].speed >
              self.tableMap[i].posY + this.iceBlockHeight &&
            self[char].posX < self.tableMap[i].posX + this.iceBlockWidth &&
            self[char].posX + self[char].height > self.tableMap[i].posX
          ) {
            self[char].direction = "none";
          }
          break;
      }
    }
  };

  // Detect Hero-Enemy Collision
  this.charCollision = function (char1, char2) {
    if (
      self[char1].posX < self[char2].posX + self[char2].height &&
      self[char1].posX + self[char1].height > self[char2].posX &&
      self[char1].posY < self[char2].posY + self[char2].height &&
      self[char1].height + self[char1].posY > self[char2].posY
    ) {
      this.gameOver();
    }
  };

  // Detect Border Collision
  this.borderCollision = function (char) {
    switch (this[char].direction) {
      case "up":
        if (this[char].posY - this[char].speed > 0) {
          game[char].style();
        } else {
          game[char].stop();
        }
        break;
      case "right":
        if (this[char].posX + this[char].speed < 858) {
          game[char].style();
        } else {
          game[char].stop();
        }
        break;
      case "down":
        if (this[char].posY + self[char].height + this[char].speed < 650) {
          game[char].style();
        } else {
          game[char].stop();
        }
        break;
      case "left":
        if (this[char].posX - this[char].speed > 0) {
          game[char].style();
        } else {
          game[char].stop();
        }
        break;
      case "none":
        game[char].style();
        break;
    }
  };

  // Game Win

  this.gameWin = function (char) {
    //musicini.pause();
    //this.gameMusic.pause();
    //this.herowin.play();
    this.yetidead.play();
    self.penguin.direction = "win";
    self[char].direction = "dead";    
    game.penguin.style();
    game[char].style();
    self[char].paintEnemy();    
    clearInterval(self[char].timerEnemyMvt);
    self[char].posX = 2000
    setTimeout(function () {
      game[char].deleteEnemy();
      self[char].posX = 2000;
      self[char].posY = 2000;      
    }, 2000);
  };

  // Game Over
  this.gameOver = function () {
    clearInterval(this.timerId);
    clearInterval(self.yeti.timerEnemyMvt);
    clearInterval(self.yeti2.timerEnemyMvt);
    clearInterval(self.yeti3.timerEnemyMvt);
    clearInterval(self.yeti4.timerEnemyMvt);
    clearInterval(this.timerBlowBomb);
    clearInterval(this.timerExpandBomb);
    musicini.pause();
    this.gameMusic.pause();
    this.herodead.play();
    self.penguin.direction = "dead";
    self.yeti.direction = "win";
    self.yeti2.direction = "win";
    self.yeti3.direction = "win";
    self.yeti4.direction = "win";
    game.penguin.style();
    game.yeti.style();
    game.yeti2.style();
    game.yeti3.style();
    game.yeti4.style();
    setTimeout(function () {
      self.container.style.display = "none";
      self.main.style.backgroundImage =
        "url(./assets/graphics/fondogameover.png)";
      self.main.style.display = "block";
      self.main.style.height = "100%";
      self.main.style.width = "100%";
      game.penguin.deleteHero();
      game.yeti.deleteEnemy();
      game.yeti2.deleteEnemy();
      game.yeti3.deleteEnemy();
      game.yeti4.deleteEnemy();
    }, 1500);
  };

  //StartGame
  this.startGame = function () {
    musicini.pause();
    self.gameMusic.play();
    self.gameMusic.addEventListener(
      "ended",
      function () {
        this.currentTime = 0;
        this.play();
      },
      false
    );
    this.container.style.display = "block";
    this.main.style.display = "none";
    self.mapKeys();
    self.exitBtn();
    self.generateIceMap();
    self.penguin.heroGenerate();
    self.yeti.enemyGenerate();
    self.yeti2.enemyGenerate();
    self.yeti3.enemyGenerate();
    self.yeti4.enemyGenerate();
    self.yeti2.movementrdm("yeti");
    self.yeti2.movementrdm("yeti2");
    self.yeti3.movementrdm("yeti3");
    self.yeti4.movementrdm("yeti4");
    this.timerId = setInterval(this.moveControl, 0.1);
  };
}

//Game
musicini.play();
btnMain.onclick = function () {
  game = new IcePinguin();
  game.audiobtn.play();
  game.startGame();
};
