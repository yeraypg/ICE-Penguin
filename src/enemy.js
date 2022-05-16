//Constructor Enemy
function Enemy() {
  this.idMovement;
  this.enemy = document.getElementById("enemy");
  this.direction = "none";
  this.speed = 2;
  this.height = 50;
  this.posX = 550;
  this.posY = 315; 

  //automatic aleatory movement -- 0 up / 1 down / 2 left / 3 right
  this.movementrdm = function () {
    this.timerEnemyMvt = setInterval(function () {
      var rdmDirection = Math.floor(Math.random() * 4);
      switch (rdmDirection) {
        case 0:
          game.yeti.direction = "up";
          break;
        case 1:
          game.yeti.direction = "down";
          break;
        case 2:
          game.yeti.direction = "left";
          break;
        case 3:
          game.yeti.direction = "right";
          break;
      }
    }, 2000);
  };

  //Move Control - asign new Enemy value to posX and posY

  this.moveUp = function () {
    this.posY -= this.speed;
  };

  this.moveDown = function () {
    this.posY += this.speed;
  };

  this.moveRight = function () {
    this.posX += this.speed;
  };

  this.moveLeft = function () {
    this.posX -= this.speed;
  };

  this.moveNone = function () {};

  this.stop = function () {
    this.direction = "none";
    this.moveNone();
  };

  //refresh DOM position of Enemy
  this.paintEnemy = function () {
    this.enemy.style.top = this.posY + "px";
    this.enemy.style.left = this.posX + "px";
  };

  //change sprite of Enemy
  this.style = function () {
    switch (this.direction) {
      case "up":
        game.yeti.enemy.style.backgroundImage =
          "url(/source/graphics/yetiright.png)";
        break;
      case "right":
        game.yeti.enemy.style.backgroundImage =
          "url(/source/graphics/yetiright.png)";
        break;
      case "down":
        game.yeti.enemy.style.backgroundImage =
          "url(/source/graphics/yetileft.png)";
        break;
      case "left":
        game.yeti.enemy.style.backgroundImage =
          "url(/source/graphics/yetileft.png)";
        break;
      case "none":
        game.yeti.enemy.style.backgroundImage =
          "url(/source/graphics/yetileft.png)";
        break;
      case "win":
        game.yeti.enemy.style.backgroundImage =
          "url(/source/graphics/yetiwin.png)";
        break;
    }
  };
}
