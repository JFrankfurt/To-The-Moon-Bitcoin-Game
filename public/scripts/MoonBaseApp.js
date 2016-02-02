var moonbase = angular.module("moonbase", ["ui.router", "app.game"])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('');

  $stateProvider.state('home', {
    url: '',
    templateUrl: '../partials/main.html'
    controller: 'MenuController as menuCtrl'
  });
})

.controller('MenuController', function($scope, $rootScope, gameFactory) {

  gameFactory.init();
  $scope.on('$destroy', function() {
    gameFactory.destroy();
  });
});
