var moonbase = angular.module("moonbase", ["ui.router", "app.game"])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/index');

  $stateProvider

    .state('index', {
    url: '/index',
    templateUrl: 'partials/main.html',
    controller: 'MenuController as menuCtrl'
  })

    .state('about', {
      url: '/about',
      templateUrl: 'partials/about.html'
    })

    .state('contact', {
      url: '/contact',
      templateUrl: 'partials/contact.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html'
    });

})

.controller('MenuController', function($scope, $rootScope, gameFactory) {

  gameFactory.init();
  $scope.on('$destroy', function() {
    gameFactory.destroy();
  });
});
