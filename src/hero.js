//Constructor Hero
function Hero() {
  this.hero = document.getElementById("hero");
  this.direction = "none";
  this.speed = 3;
  this.height = 35;
  this.posX = 75;
  this.posY = 75;

  //Move Control - asign new Hero value to posX and posY 

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

  //refresh DOM position of Hero
  this.paintHero = function () {
    this.hero.style.top = this.posY + "px";
    this.hero.style.left = this.posX + "px";
  };

  //change sprite of hero
  this.style = function () {
    switch (this.direction) {
      case "up":
        game.penguin.hero.style.backgroundImage =
          "url(/source/graphics/penguiup.png)";
        break;
      case "right":
        game.penguin.hero.style.backgroundImage =
          "url(/source/graphics/penguiright.png)";
        break;
      case "down":
        game.penguin.hero.style.backgroundImage =
          "url(/source/graphics/penguidown.png)";
        break;
      case "left":
        game.penguin.hero.style.backgroundImage =
          "url(/source/graphics/penguileft.png)";
        break;
      case "none":
        game.penguin.hero.style.backgroundImage =
          "url(/source/graphics/penguistop.png)";
        break;
      case "dead":
        game.penguin.hero.style.backgroundImage =
          "url(/source/graphics/penguidead.png)";
        break;
    }
  };
}
