// Define enemy start position, speed and image
var Enemy = function(x, y) {
    'use strict';
    this.x = x;
    this.y = y;
    this.speed = 10 + Math.random() * 10;
    this.sprite = 'images/enemy-bug.png';
};

// Draw enemy on the screen
Enemy.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update enemy position
Enemy.prototype.update = function(dt) {
    'use strict';
    this.x += (this.speed + 100) * dt;
    if (this.x > 500) {
        this.x = -150;
        this.speed = Math.random() * (500 - 100) + 100;
    }
};

// Define player start position, score and image
var Player = function() {
    'use strict';
    this.x = 200;
    this.y = 400;
    this.score = 0;
    this.sprite = 'images/char-pink-girl.png';
};

// Draw player and score on the screen
Player.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = 'bold 20px Helvetica';
    ctx.fillStyle = '#ff69b4';
    ctx.fillText("SCORE: " + this.score, 205, 100);
};

// Define player movements inside the canvas
Player.prototype.handleInput = function(keyCode) {
    'use strict';
    switch (keyCode) {
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x += 101;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 85;
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y += 85;
            }
            break;
    }

};

// Collision detection
Player.prototype.collisions = function() {
    'use strict';
  for (var i = 0, len = allEnemies.length; i < len; i++) {
        if (this.x < allEnemies[i].x + 50 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            this.y + 50 > allEnemies[i].y) {
            alert("A Bug Ate You!");
            this.reset();
        }
    }
};


// Reset player to original position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Check for collisions and update player position
Player.prototype.update = function() {
    this.collisions();
    if (this.y < 2) {
        this.reset();
        this.score += 1;
    }
};

// Instantiate the Player object
var player = new Player();

// The allEnemies array, which holds all of the enemy objects
var enemy1 = new Enemy(250, 220, this.speed);
var enemy2 = new Enemy(170, 140, this.speed);
var enemy3 = new Enemy(200, 60, this.speed);
var allEnemies = [enemy1, enemy2, enemy3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
