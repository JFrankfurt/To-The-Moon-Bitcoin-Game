function Mainmenu(game){}
var stateText;
Mainmenu.prototype = {
    create: function(){
        stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', {
            font: '84px Arial',
            fill: '#fff'
        });
        var playButton = this.game.add.button(300, 300, "Start", this.startGame, this);
        this.title();
    },
    title: function () {
        stateText.text = "To the Moon!";
        stateText.visible = true;
    },
    startGame: function () {
        this.game.state.start("Play");
    }
};