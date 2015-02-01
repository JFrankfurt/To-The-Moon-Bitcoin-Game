function Mainmenu(game){}
var stateText;
Mainmenu.prototype = {
    create: function(){
        this.background = this.game.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
        this.background.autoScroll(-50, -20);
        this.background.tilePosition.x = 0;
        this.background.tilePosition.y = 0;
        this.game.add.sprite(this.game.world.centerX - 118, 10, 'logo');
        stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', {
            font: '84px Arial',
            fill: '#fff'
        });
        stateText.anchor.setTo(0.5, 0.5);
        var playButton = this.game.add.button(400, 400, "Start", this.startGame, this);
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
