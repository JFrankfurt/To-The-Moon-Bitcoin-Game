function Boot(game){
};

Boot.prototype = {
    preload: function(){
        this.game.load.image("loading","assets/aliens-from-outer-space.png");
    },
    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.setScreenSize();
        this.game.state.start("Preload");
    }
};