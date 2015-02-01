function Boot(game){
};

Boot.prototype = {
    preload: function(){

    },
    create: function(){
        this.game.state.start("Preload");
    }
};


