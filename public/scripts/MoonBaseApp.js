var moonbase = angular.module("moonbase", []);
moonbase.constant('url1', 'http://www.moonbasegames.com/endgame');

moonbase.service('makeCall', function($http, url) {
    function _sendCoin(address, earned) {

    var earned = earned || {};
    var address = address || {};

    var params = {
        address : address.q,
        earned  : earned.q
    };
    return $http.post(url, params)
        .success(function (data, status, headers, config) {
        })
        .error(function (data, status, headers, config) {
            console.log('data=', data);
            console.log('status=', status);
            console.log('headers=', headers);
            console.log('config=', config);
        });
    }
    return {
        sendCoin : _sendCoin
    };
});
moonbase.controller('MenuController', ["makeCall", function($scope, makeCall) {
    $scope.wallet = {
        earned: 0,
        balance: 0,
        address: ' '
    };
    $scope.mount = function () {
        makeCall.sendCoin($scope.wallet.address);
        $scope.showCashout = true;
    };
    $scope.cashout = function () {
        makeCall.sendCoin($scope.wallet.address, $scope.wallet.earned);
    };
}]);
moonbase.directive("mount", function () {
    return {
        restrict: "E",
        bindToController: true,
        controller: "MenuController as Menu",
        templateUrl: "partials/mount.html"
    };
});
moonbase.directive('cashout', function () {
    return {
        restrict: "E",
        bindToController: true,
        controller: "MenuController as Menu",
        templateUrl: "partials/cashout.html"
    }
});
