//Constructor Hero
function Hero() {
    this.direction = "none";
    this.speed = 3000;
    this.posX = "40px";
    this.posY = "40px";
  
    //Move Control
    this.moveUp = function () {
        elem.style.transform = "100px";
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
      this.speed = 0;
    };
    
  }