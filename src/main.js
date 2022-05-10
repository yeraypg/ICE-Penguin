
var hero = document.getElementById("hero")
function IcePinguin(){
    self = this
    this.timerId 
    this.hero = new Hero()
    this.map



this.mapKeys = function() {
    document.addEventListener('keyup', function(e) {
      switch (e.key) {
        case 'ArrowUp': self.snake.direction = 'up'; break;
        case 'ArrowRight': self.snake.direction = 'right'; break;
        case 'ArrowDown': self.snake.direction = 'down'; break;
        case 'ArrowLeft': self.snake.direction = 'left'; break;
      }
    })}

}

function Hero() {
    this.top = 40
    this.left = 40
}
