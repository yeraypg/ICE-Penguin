//Constructor Enemy
function Enemy() {
    this.enemy = document.getElementById("enemy");
    this.direction = "none";
    this.speed = 1;
    this.posX = 900;
    this.posY = 60;


//Move Control - Asigna el nuevo valor de la posición del Enemy

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

  this.moveNone = function () {
    
};

  this.stop = function () {
    this.direction = "none";
    this.moveNone();
  }

  //Actualizar posición de Enemy en DOM
  this.paintEnemy = function () {
    this.enemy.style.top = this.posY + "px";
    this.enemy.style.left = this.posX + "px";
  };

  this.style = function() {
    switch (this.direction) {
      case "up": game.yeti.enemy.style.backgroundImage =
      "url(/source/graphics/penguiup.png)";
      break;
      case "right": game.yeti.enemy.style.backgroundImage =
      "url(/source/graphics/penguiright.png)";
      break;
      case "down": game.yeti.enemy.style.backgroundImage =
      "url(/source/graphics/penguidown.png)";
      break;
      case "left": game.yeti.enemy.style.backgroundImage =
      "url(/source/graphics/penguileft.png)";
      break;
      case "none": game.yeti.enemy.style.backgroundImage =
      "url(/source/graphics/penguistop.png)";
      break;
      
    }

  }
}