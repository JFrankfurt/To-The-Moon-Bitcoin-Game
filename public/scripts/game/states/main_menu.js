function Mainmenu(game){}

Mainmenu.prototype = {
    create: function(){
        var playButton = this.game.add.button(300, 300, "Start", this.startGame, this);
    },
    startGame: function () {
        this.game.state.start("Play");
    }
};