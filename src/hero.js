

//Constructor Hero
function Hero() {
  this.elem = document.getElementById("hero");
  this.direction = "none";
  this.speed = 10;
  this.posX = 63;
  this.posY = 63;

  //Move Control
  this.moveUp = function () {
    this.posY -= this.speed;
    this.elem.style.top = this.posY + "px"
  };
  this.moveDown = function () {
    this.posY += this.speed;
    this.elem.style.top = this.posY + "px"
  };
  this.moveRight = function () {
    this.posX += this.speed;
    this.elem.style.left = this.posX + "px"
  };
  this.moveLeft = function () {
    this.posX -= this.speed;
    this.elem.style.left = this.posX + "px"
  };
  this.moveNone = function () {

  };

  // this.borderColision = function() {
  //   if (this.direction == "up") {
  //     if (this.posY + this.speed < 63) {
  //       this.moveUp()
  //     } else {
  //       this.moveNone
  //     }
  //   }
  // }
}