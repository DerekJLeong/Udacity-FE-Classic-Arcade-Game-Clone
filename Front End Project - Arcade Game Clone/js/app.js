//game's initial level
let level = 1;
// Enemies our player must avoid
let Enemy = function (x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.xOrigin = x;
    this.yOrigin = y;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // sets the speed of the Enemy based on the level
    if (level === 1) {
        for (let i = 0; i < allEnemies.length; i++) {
            allEnemies[i].speed = 200;
        }
    }
    if (level === 2) {
        for (let j = 0; j < allEnemies.length; j++) {
            allEnemies[j].speed = 250;
        }
    }
    if (level === 3) {
        for (let k = 0; k < allEnemies.length; k++) {
            allEnemies[k].speed = 300;
        }
    }

    // multiplying any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);

    //reset enemy's position after reaching end of screen
    if (this.x >= 500) {
        this.reset();
    }
    // Collision checker
    if (player.x >= this.x - 40 && player.x <= this.x + 40) {
        if (player.y >= this.y - 40 && player.y <= this.y + 40) {
            player.reset(this);
        }
    }
};
Enemy.prototype.reset = function () {
    this.x = this.xOrigin;
    this.y = this.yOrigin;
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class including updater, renderer, and input handling
let Player = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};
Player.prototype.update = function (dt) {
    //changes, handles and displays the level
    if (this.y < -18) {
        this.reset();
        level++;
        if (level > 3) {
            $('h3').css("display", "block").append('You Win! Game Restarting...');
            setTimeout(showResult, 3000);
            level = 1;
        }
        document.getElementById("myspan").innerHTML = level;
    }

};
let showResult = function () {
    $('h3').css("display", "none").text("");
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (rcv) {
    if (rcv === 'left' && this.x > 0)
        this.x = this.x - 85;
    else if (rcv === 'right' && this.x < 400)
        this.x = this.x + 85;
    else if (rcv === 'up' && this.y > -50)
        this.y = this.y - 85;
    else if (rcv === 'down' && this.y < 375)
        this.y = this.y + 85;
};
// Used to reset position
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

// Instantiate and store Player in player
let player = new Player(200, 375);

let allEnemies = [];
// Instantiate 3 enemies, push to allEnemies array
for (let i = 0; i < 3; i++) {
    //creates a random x coordinate
    let randomizer = -1 * (Math.floor(Math.random() * 300) + 50);
    //enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230
    allEnemies.push(new Enemy(randomizer, 60 + (85 * i)));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});