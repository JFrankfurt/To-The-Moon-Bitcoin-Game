function Boot(game){}

var gameMusic;

Boot.prototype = {
    preload: function(){
    },
    create: function(){
        gameMusic = this.game.add.audio('gameMuzic', 1, false);
        gameMusic.play();
        this.game.state.start("Preload");
    }
};