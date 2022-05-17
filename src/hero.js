//Constructor Hero
function Hero() {
  this.hero;
  this.direction = "none";
  this.speed = 3;
  this.height = 35;
  this.posX = 5;
  this.posY = 5;

  this.heroGenerate = function () {
    this.hero = document.createElement("div");
    this.hero.id = "hero";
    map.appendChild(this.hero);
  };

  this.deleteHero = function () {
    map.removeChild(this.hero);
  };

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

  this.moveNone = function () {
    this.posX -= 0;
    this.posY -= 0;
  };

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
          "url(/source/graphics/penguiupanim.png)";
        break;
      case "right":
        game.penguin.hero.style.backgroundImage =
          "url(/source/graphics/penguirightanim.png)";
        break;
      case "down":
        game.penguin.hero.style.backgroundImage =
          "url(/source/graphics/penguidownanim.png)";
        break;
      case "left":
        game.penguin.hero.style.backgroundImage =
          "url(/source/graphics/penguileftanim.png)";
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
