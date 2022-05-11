//Constructor Hero
function Hero() {
  this.elem = document.getElementById("hero");
  this.direction = "none";
  this.speed = 10;
  this.posX = 63;
  this.posY = 63;

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

  this.moveNone = function () {};

  //Actualizar posición de Hero
  this.paintHero = function () {
    this.elem.style.top = this.posY + "px";
    this.elem.style.left = this.posX + "px";
  };
}
