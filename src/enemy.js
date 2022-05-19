//Constructor Enemy
function Enemy(posX, posY) {
  this.idMovement;
  this.enemy = document.getElementById("enemy");
  this.direction = "none";
  this.speed = 2.5;
  this.height = 50;
  this.posX = posX;
  this.posY = posY;
  this.timerEnemyMvt;

  this.enemyGenerate = function () {
    this.enemy = document.createElement("div");
    this.enemy.id = "enemy";
    map.appendChild(this.enemy);
  };

  this.deleteEnemy = function () {
    map.removeChild(this.enemy);
  };

  //automatic aleatory movement -- 0 up / 1 down / 2 left / 3 right
  this.movementrdm = function (char) {
    this.timerEnemyMvt = setInterval(function () {
      var rdmDirection = Math.floor(Math.random() * 4);
      switch (rdmDirection) {
        case 0:
          game[char].direction = "up";
          break;
        case 1:
          game[char].direction = "down";
          break;
        case 2:
          game[char].direction = "left";
          break;
        case 3:
          game[char].direction = "right";
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
        this.enemy.style.backgroundImage =
          "url(./assets/graphics/yetiright.png)";
        break;
      case "right":
        this.enemy.style.backgroundImage =
          "url(./assets/graphics/yetiright.png)";
        break;
      case "down":
        this.enemy.style.backgroundImage =
          "url(./assets/graphics/yetileft.png)";
        break;
      case "left":
        this.enemy.style.backgroundImage =
          "url(./assets/graphics/yetileft.png)";
        break;
      case "none":
        this.enemy.style.backgroundImage =
          "url(./assets/graphics/yetileft.png)";
        break;
      case "dead":
        this.enemy.style.backgroundImage =
          "url(./assets/graphics/yetidead2.png)";
        break;
    }
  };
}
