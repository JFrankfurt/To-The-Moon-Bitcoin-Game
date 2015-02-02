function Play(game) {}
    var cursors;
    var fireButton;
    var explosions;
    var stateText;
    var restartButton;
    var nextLevelButton;


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


Play.prototype = {

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.background = this.game.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
        this.background.autoScroll(-50, -20);
        this.background.tilePosition.x = 0;
        this.background.tilePosition.y = 0;


        //  Our bullet group
        bullets = this.game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

        // The enemy's bullets
        enemyBullets = this.game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets.createMultiple(30, 'enemyBullet');
        enemyBullets.setAll('anchor.x', 0.5);
        enemyBullets.setAll('anchor.y', 1);
        enemyBullets.setAll('outOfBoundsKill', true);
        enemyBullets.setAll('checkWorldBounds', true);

        //  The hero!
        player = this.game.add.sprite(400, 560, 'SpriteSheet', 18);
        player.anchor.setTo(0.5, 0.5);
        player.enableBody = true;
        player.physicsBodyType = Phaser.Physics.ARCADE;
        this.game.physics.enable(player, Phaser.Physics.ARCADE);
        player.animations.add('left', [14, 16], 10, true);
        player.animations.add('right', [15, 17], 10, true);
        player.animations.add('still', [18], 0, true);
        player.body.bounce.x = 0.5;
        player.body.collideWorldBounds = true;

        //  The baddies!
        aliens = this.game.add.group();
        aliens.enableBody = true;
        aliens.physicsBodyType = Phaser.Physics.ARCADE;
        this.createAliens();


        //initiallize sounds
        enemyBulletSound = this.game.add.audio('pew', 1, false);
        enemyBulletHitSound = this.game.add.audio('pew2', 1, false);
        playerHitSound = this.game.add.audio('playerhit', 1, false);

        //  The score
        scoreString = 'Score : ';
        scoreText = this.game.add.text(10, 10, scoreString + score, {font: '34px Arial', fill: '#fff'});

        // The level
        levelString = 'Level : ';
        levelText = this.game.add.text(10, 50, levelString + level, {font: '34px Arial', fill: '#fff'});

        //  Lives
        lives = this.game.add.group();

        //Text
        stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', {
            font: '84px Arial',
            fill: '#fff'
        });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;

        for (var i = 0; i < 3; i++) {
            var ship = lives.create(this.game.world.width - 30, (150 + (-60 * i)), 'SpriteSheet', 18);
            ship.anchor.setTo(0.5, 0.5);
            ship.angle = 0;
            ship.alpha = 0.8;
        }

        //  An explosion pool
        explosions = this.game.add.group();
        explosions.createMultiple(9, 'SpriteSheet');
        explosions.forEach(this.setupExplosion);

        //  And some controls to play the game with
        cursors = this.game.input.keyboard.createCursorKeys();
        fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        restartButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        nextLevelButton = this.game.input.keyboard.addKey(Phaser.Keyboard.N);
    },

    update: function () {
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
            this.fireBullet();
        }
        if (this.game.time.now > firingTimer) {
            this.enemyFires();
        }
        //restart button
        if (restartButton.isDown && lives.countLiving() == 0) {
            this.restart();
        }
        //next level button
        if (nextLevelButton.isDown && aliens.countLiving() === 0) {
            this.nextLevelRestart();
        }

        this.game.physics.arcade.overlap(bullets, aliens, this.collisionHandler, null, this);
        this.game.physics.arcade.overlap(enemyBullets, player, this.enemyBulletHitsPlayer, null, this);
        this.game.physics.arcade.overlap(aliens, player, this.enemyHitsPlayer, null, this);
    },
    createAliens: function() {
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 10; x++) {
                var alien = aliens.create(x * 48, y * 50, 'SpriteSheet', 0);
                alien.anchor.setTo(0, 0);
                alien.body.moves = false;
                alien.animations.add('move', [1, 2, 3, 4], 10, true);
                alien.play('move')
            }
        }

        aliens.x = 2;
        aliens.y = 50;

        //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.

        var tween = this.game.add.tween(aliens).to( { x: 308 }, 2500, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000, true);


        //  When the tween loops it calls descend
        tween.onLoop.add(this.descend, this);
    },
    setupInvader: function(invader) {
        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
    },
    setupExplosion: function(explosion) {
        explosion.animations.add('explode!', [5, 6, 7, 8, 9, 10, 11, 12, 13], 20, true);
    },
    descend: function() {
        //aliens.y += 8;
            this.game.add.tween(aliens).to({y: aliens.y + 8}, 2500, Phaser.Easing.Linear.None, false, 0, 0, false);
    },

    collisionHandler: function(bullet, alien) {
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
            enemyBullets.callAll('kill', this);
            stateText.text = " You Won, \n 'N' for next level";
            stateText.visible = true;
            //the "click to restart" handler
            level += 1;
            levelText.text = levelString + level;
            //this.nextLevelRestart();
        }
    },
    enemyBulletHitsPlayer: function(player, bullet) {
        bullet.kill();
        alive = lives.getFirstAlive();
        if (alive) {
            alive.kill();
        }
        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.play('explode!', 30, false, true);
        playerHitSound.play();
        // When the player dies
        if (lives.countLiving() < 1) {
            player.kill();
            enemyBullets.callAll('kill');
            this.gameOver();
        }
    },
    enemyHitsPlayer: function(player, aliens) {
        aliens.kill();
        player.kill();

        alive = lives.getFirstAlive();

        if (alive) {
            alive.kill();
        }


        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.play('explode!', 30, false, true);
        playerHitSound.play();


        // When the player dies
        if (lives.countLiving() === 1) {
            player.kill();


            gameOver();

        }
        if (lives.countLiving() > 0) {
            player.revive();
        }

    },
    enemyFires: function() {
        //  Grab the first bullet we can from the pool
        enemyBullet = enemyBullets.getFirstExists(false);

        livingEnemies.length = 0;

        aliens.forEachAlive(function (alien) {

            // put every living enemy in an array
            livingEnemies.push(alien);
        });

        if (enemyBullet && livingEnemies.length > 0) {
            enemyBulletSound.play();
            var random = this.game.rnd.integerInRange(0, livingEnemies.length - 1);
            // randomly select one of them
            var shooter = livingEnemies[random];
            // And fire the bullet from this enemy
            enemyBullet.reset(shooter.body.x, shooter.body.y);
            this.game.physics.arcade.moveToObject(enemyBullet, player, 120);
            firingTimer = this.game.time.now + 2000;
        }
    },
    fireBullet: function() {
        //  To avoid them being allowed to fire too fast we set a time limit
        if (this.game.time.now > bulletTime) {
            //  Grab the first bullet we can from the pool
            bullet = bullets.getFirstExists(false);
            if (bullet) {
                //  And fire it
                bullet.reset(player.x, player.y + 8);
                bullet.body.velocity.y = -400;
                bulletTime = this.game.time.now + 200;
            }
        }
    },
    gameOver: function(){
        stateText.text = "GAME OVER \n Enter to restart";
        stateText.visible = true;
    },
    resetBullet: function(bullet){
        //  Called if the bullet goes out of the screen
        bullet.kill();
    },
    resetAliens: function(alien) {
        alien.kill();
    },
    restartWave: function() {
        aliens.removeAll();
        this.createAliens();
    },
    restart: function(){
        //resets the life count
        lives.callAll('revive');
        //  And brings the aliens back from the dead :)
        aliens.removeAll();
        this.createAliens();
        //revives the player
        player.revive();
        score = 0;
        level= 1;
        scoreString = 'Score : ';
        levelString = 'Level : ';
        //hides the text
        stateText.visible = false;
    },
    nextLevelRestart: function() {
        aliens.removeAll();
        this.createAliens();
        player.revive();
        stateText.visible = false;
    }
};