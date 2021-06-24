const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
canvas.style.backgroundColor = 'white';

const projectileSpeed = 5;
const enemySpeed = 2;
let score = 0;

let time = 60;

setInterval(() => {
  time -= 1;
}, 1000)

class Player {
  constructor() {
    this.x = 20
    this.y = canvas.height - 20;
    this.radius = 20
    this.color = 'red'
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }
}

class Projectile {
  constructor(x, y, xVel, yVel) {
    this.x = x
    this.y = y
    this.radius = 5
    this.color = 'blue'
    this.xVel = xVel;
    this.yVel = yVel;
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update(){

    this.yVel += 0.045;

    this.x = this.x + this.xVel;
    this.y = this.y + this.yVel;
  }
}

class Enemy {
  constructor(x, y, enemyXVel, enemyYVel) {
    this.x = x
    this.y = y
    this.radius = 10;
    this.color = 'green'
    this.enemyXVel = enemyXVel;
    this.enemyYVel = enemyYVel;
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update(){
    this.x = this.x + this.enemyXVel;
    this.y = this.y + this.enemyYVel;
  }
}

// create player
const player = new Player()

// create projectiles
let projectiles = []
window.addEventListener('click', (e) => {

  let xDistance = Math.abs(e.clientX - player.x);
  let yDistance = Math.abs(e.clientY - player.y);

  let tanTheta = yDistance / xDistance;
  let Theta = Math.atan(tanTheta);

  projectile = new Projectile(player.x, player.y, 6*Math.cos(Theta), -6*Math.sin(Theta));
  projectiles.push(projectile);
})

// spawn enemies
let enemies = [];
setInterval(() => {
  const enemy = new Enemy(
                          Math.random() * canvas.width,
                          Math.random() * canvas.height,
                          -1 * enemySpeed,
                          enemySpeed
                          )
  enemies.push(enemy);
}, 1000)




function animate() {

  if(time >= 0){

    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.draw();

    enemies.forEach((enemy) => {
      projectiles.forEach((projectile) => {

        let projectileIndex = projectiles.indexOf(projectile);
        let enemyIndex = enemies.indexOf(enemy);

        if(
            Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y) < 15
          ){
            projectiles.splice(projectileIndex, 1);
            enemies.splice(enemyIndex, 1);
            score += 1;
        }
      })
    });

    c.font = "20px Arial";
    c.fillText('Score: ' + score, 40, 50);
    c.fillText('Time: ' + time, 40, 100);

    projectiles.forEach((projectile) => {
      projectile.update()
      projectile.draw()
    })

    enemies.forEach((enemy) => {
      enemy.update();
      enemy.draw();
    });

} else {
  alert(`Your score was: ${score}, well done!`)
}

}

animate();


window.addEventListener('keyup', (e) => {
  window.location.reload()
});









