function Preload (game) {
};

Preload.prototype = {
    preload: function(){
        this.game.load.atlasJSONHash('SpriteSheet', 'assets/SpriteSheet.png','assets/SpriteSheet.json');
        this.game.load.image('bullet', 'assets/bitcoin-mini.png');
        this.game.load.image('enemyBullet', 'assets/enemybullet2.jpg');
        this.game.load.image('kaboom', 'assets/explosion3.jpg');
        this.game.load.image('background', 'assets/background.png');
        this.game.load.image('logo', 'assets/Transparent Logo.PNG');
        this.game.load.image('Start', 'assets/imgres.jpg');
        this.game.load.audio('pew', 'assets/InvaderBullet.wav');
        this.game.load.audio('pew2', 'assets/InvaderHit.wav');
        this.game.load.audio('playerhit', 'assets/ShipHit.wav');
    },
    create: function(){
        this.game.state.start("MainMenu");
    }
};
