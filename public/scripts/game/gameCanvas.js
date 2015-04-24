(function() {
  angular.module('app.game', [])

  .directive('gameCanvas', function($injector) {
    return {
      scope: {
        score: score,
        earned: satoshis,
        lives: lives,
        address: address,
        mounted: mounted
      },
      bindToController: true,
      controller: "CanvasCtrl as canvas",
      template: "partials/main.html"
    }
  })

  .controller('CanvasCtrl', function CanvasCtrl(){
    var that = this;

  })

  .factory('GameFactory', function() {
    this.createGame = function () {
      var game = new Phaser.Game(800, 600, Phaser.CANVAS,'ToTheMoon');
      game.state.add("Boot", Boot);
      game.state.add("Preload", Preload);
      game.state.add("MainMenu", mainMenu);
      game.state.add("Play", Play);
      game.state.add("GameOver", GameOver);
      game.state.start("Boot");
    }
  })
})();
