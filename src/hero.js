var elem = document.getElementById("hero");

//Constructor Hero
function Hero() {
  this.direction = "none";
  this.speed = 3;
  this.posX = 63;
  this.posY = 63;

  //Move Control
  this.moveUp = function () {
    this.posY -= this.speed;
    elem.style.top = this.posY + "px"
  };
  this.moveDown = function () {
    this.posY += this.speed;
    elem.style.top = this.posY + "px"
  };
  this.moveRight = function () {
    this.posX += this.speed;
    elem.style.left = this.posX + "px"
  };
  this.moveLeft = function () {
    this.posX -= this.speed;
    elem.style.left = this.posX + "px"
  };
  this.moveNone = function () {

  };

}