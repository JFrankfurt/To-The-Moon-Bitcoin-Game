function Boot(game){
};

Boot.prototype = {
    preload: function(){
        this.game.load.image("loading","assets/aliens-from-outer-space.png");
    },
    create: function(){
        this.game.state.start("Preload");
    }
};


