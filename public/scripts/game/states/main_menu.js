function Mainmenu(game){}

Mainmenu.prototype = {
    create: function(){
        this.game.state.start("Play");
    }
};
