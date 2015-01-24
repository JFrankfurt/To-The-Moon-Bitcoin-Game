var app = angular.module("app", []);

var game = new Phaser.Game('95%', '95%', Phaser.CANVAS,'ToTheMoon',
                           { preload: preload,
                             create : create,
                             update : update,
                             render : render });

function preload() {
    game.load.atlasJSONHash('SpriteSheet', 'assets/SpriteSheet.png','assets/SpriteSheet.json');
    game.load.image('bullet', 'assets/bitcoin-mini.png');
    game.load.image('enemyBullet', 'assets/enemybullet2.jpg');
    game.load.image('kaboom', 'assets/explosion3.jpg');
    game.load.audio('pew', 'assets/InvaderBullet.wav');
    game.load.audio('pew2', 'assets/InvaderHit.wav');
    game.load.audio('playerhit', 'assets/ShipHit.wav');
}

var cursors;
var fireButton;
var explosions;
var stateText;

    //bodies
    var player;
    var alive;
    var lives;
    var flying = 'still';
    var bulletTime = 0;
    var bullets;
    var aliens;
    var invader;
    var enemyBullets;
    var firingTimer = 0;
    var livingEnemies = [];

    //score
    var score = 0;
    var scoreText;
    var scoreString = '';

    //level
    var level = 1;
    var levelString = '';
    var levelText;

    //sounds
    var enemyBulletSound;
    var enemyBulletHitSound;
    var playerHitSound;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);


    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  The hero!
    player = game.add.sprite(400, 560, 'SpriteSheet', 18);
    player.anchor.setTo(0.5, 0.5);
    player.enableBody = true;
    player.physicsBodyType = Phaser.Physics.ARCADE;
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.animations.add('left', [14, 16], 10, true);
    player.animations.add('right', [15, 17], 10, true);
    player.animations.add('still', [18], 0, true);
    player.body.bounce.x = 0.5;
    player.body.collideWorldBounds = true;

    //  The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    createAliens();

    //initiallize sounds
    enemyBulletSound = game.add.audio('pew', 1, false);
    enemyBulletHitSound = game.add.audio('pew2', 1, false);
    playerHitSound = game.add.audio('playerhit', 1, false);

    //  The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    // The level
    levelString = 'Level : ';
    levelText = game.add.text(10, 50, levelString + level, { font: '34px Arial', fill: '#fff'});

    //  Lives
    lives = game.add.group();

    //Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < 3; i++)
    {
        var ship = lives.create(game.world.width - 30, (150 +(-60 * i)),'SpriteSheet', 18);
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 0;
        ship.alpha = 0.8;
    }

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(9, 'SpriteSheet');
    explosions.forEach(setupExplosion, this);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function createAliens () {

    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < 10; x++) {
            var alien = aliens.create(x * 48, y * 50, 'SpriteSheet', 0);
            alien.anchor.setTo(0.5, 0.5);
            alien.body.moves = false;
            alien.animations.add('move', [1, 2, 3, 4], 10, true)
            alien.play('move')
        }
    }

    aliens.x = 100;
    aliens.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
    tween.onLoop.add(descend, this);
}

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}
function setupExplosion (explosion) {
    explosion.animations.add('explode!', [5, 6, 7, 8, 9, 10, 11, 12, 13], 20, true);

}

function descend() {
    aliens.y += 10;
}

function update() {


    //  Reset the player, then check for movement keys
    player.body.velocity.setTo(0, 0);

    if (cursors.left.isDown) {
        player.body.velocity.x = -200;

        if (flying != 'left') {
            player.animations.play('left');
            flying = 'left';
            if (player.frame = 16) {
                player.animations.stop();
            }
        }
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 200;

        if (flying != 'right') {
            player.animations.play('right');
            flying = 'right';
            if (player.frame = 17) {
                player.animations.stop();
            }
        }
    }
    else {
        if (flying != 'still') {
            player.animations.stop();

            if (flying == 'still') {
                player.frame = 18;
            }
            else {
                player.frame = 18;
            }
            flying = 'still';
        }
    }

    //  Firing?
    if (fireButton.isDown) {
        fireBullet();
    }

    if (game.time.now > firingTimer) {
        enemyFires();
    }

    //  Run collision
    game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
    game.physics.arcade.overlap(enemyBullets, player, enemyBulletHitsPlayer, null, this);
    game.physics.arcade.overlap(aliens, player, enemyHitsPlayer, null, this);



}


function render() {

    // for (var i = 0; i < aliens.length; i++)
    // {
    //     game.debug.body(aliens.children[i]);
    // }

}

function collisionHandler (bullet, alien) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    score += 10;

    scoreText.text = scoreString + score;

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('explode!', 30, false, true);
    enemyBulletHitSound.play();

    if (aliens.countLiving() === 0) {

        score += 1000;

        scoreText.text = scoreString + score;
        enemyBullets.callAll('kill',this);
        stateText.text = " You Won, \n Click for next level";
        stateText.visible = true;


        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);

        level += 1;
        levelText.text = levelString + level;
    }

}

function enemyBulletHitsPlayer (player,bullet) {

    bullet.kill();

    alive = lives.getFirstAlive();

    if (alive)
    {
        alive.kill();
    }

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('explode!', 30, false, true);
    playerHitSound.play();

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        enemyBullets.callAll('kill');

        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;
        

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }

}
function enemyHitsPlayer (player, aliens) {
    aliens.kill();
    player.kill();

    alive = lives.getFirstAlive();

    if (alive)
    {
        alive.kill();
    }


    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('explode!', 30, false, true);
    playerHitSound.play();


    // When the player dies
    if (lives.countLiving() === 1)
    {
        player.kill();
        

        stateText.text= "GAME OVER \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }
    if (lives.countLiving() > 0)
    {
        player.revive();
    }


 
}

function enemyFires () {

    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length=0;

    aliens.forEachAlive(function(alien){

        // put every living enemy in an array
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {
        enemyBulletSound.play();
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,120);
        firingTimer = game.time.now + 2000;
    }

}

function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }

}

function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

function resetAliens (alien) {

    alien.kill();
        
            }

function restart () {


    //  A new level starts

    //resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    aliens.removeAll();
    createAliens();

    //revives the player
    player.revive();

    //hides the text
    stateText.visible = false;
}
