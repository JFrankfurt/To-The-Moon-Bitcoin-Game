(function() {
  angular.module('toTheMoon', [])

  .directive('cashout', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials\cashOut.html'
    }
  });

})();
