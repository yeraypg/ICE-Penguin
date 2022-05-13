//Constructor Hero
function Hero() {
  this.hero = document.getElementById("hero");
  this.direction = "none";
  this.speed = 3;
  this.height = 35;
  this.posX = 60;
  this.posY = 60;
  
  //Move Control - Asigna el nuevo valor de la posición de Hero

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

  //Actualizar posición de Hero en DOM
  this.paintHero = function () {
    this.hero.style.top = this.posY + "px";
    this.hero.style.left = this.posX + "px";
  };

  this.style = function() {
    switch (this.direction) {
      case "up": game.penguin.hero.style.backgroundImage =
      "url(/source/graphics/penguiup.png)";
      break;
      case "right": game.penguin.hero.style.backgroundImage =
      "url(/source/graphics/penguiright.png)";
      break;
      case "down": game.penguin.hero.style.backgroundImage =
      "url(/source/graphics/penguidown.png)";
      break;
      case "left": game.penguin.hero.style.backgroundImage =
      "url(/source/graphics/penguileft.png)";
      break;
      case "none": game.penguin.hero.style.backgroundImage =
      "url(/source/graphics/penguistop.png)";
      break;
      
    }

  }
}

