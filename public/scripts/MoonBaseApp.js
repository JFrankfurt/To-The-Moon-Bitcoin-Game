var moonbase = angular.module("moonbase", ["ui.router", "app.game"])

.constant('url', 'http://www.moonbasegames.com/endgame')
.config(function config($stateProvider) {
    $stateProvider.state('', {
        url: '',
        controller: "MenuController as menu",
        templateUrl: "../partials/main.html"
    })
})
.config(['ngDialogProvider', function(ngDialogProvider) {
        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-plain',
            plain: true,
            showClose: true,
            closeByDocument: true,
            closeByEscape: true,
            appendTo: false,
            preCloseCallback: function () {
                //send user to main menu and reset score?
            }
        });
    }])
.service('makeCall', function($http, url) {
    function _sendCoin(address, earned) {

    var earned = earned || {};
    var address = address || {};

    var params = {
        address : address.q,
        earned  : earned.q
    };
    return $http.get(url, params)
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
})
.controller('MenuController', function MenuCtrl ($scope, $rootScope, ngDialog, makeCall) {
    $scope.openModal = function () { //line 190 in ngDialog examples
        ngDialog.openConfirm({
            template: 'modalDialogId',
            className: 'ngdialog-theme-default',
            preCloseCallback: 'preCloseCallbackOnScope',
            scope: $scope
        }).then(function(value) {
            //handle successful call
        }, function (error) {
            //handle error
        });
    };
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
});
