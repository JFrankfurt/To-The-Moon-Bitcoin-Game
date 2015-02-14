var moonbase = angular.module("moonbase", ["ui.router", "app.game"])

.constant('url', 'http://www.moonbasegames.com/api')
.config(function config($stateProvider) {
    $stateProvider.state('', {
        url: '',
        controller: "MenuController as menu",
        templateUrl: "../partials/main.html"
    })
})
    .service('mount', ['$http', 'url', function($http, url) {
        function _mount (email, address) {
            var email = email || {};
            var address = address || {};
            var params = {
                email: email.q,
                address: address.q
            };
            return $http.get(url + '/user', params)
                .success(function(data, status, headers, config){
                    $scope.mounted = true;
                    //on success we should handle the data we get from mongo
                    //  email address
                    //  all wallets associated with it
                    //  their current balances from our game
                    //should make data available
                })
                .error(function(data, status, headers, config) {
                    console.error('data=', data);
                    console.error('status=', status);
                    console.error('headers=', headers);
                    console.error('config=', config);
                })
        }
        function _cashOut (address, earned) {
            var address = address || {};
            var earned = earned || {};
            var params = {
                address: address.q,
                earned: earned.q
            };
            return $http.get(url + '/cashout', params)
                .success(function(){})
                .error(function(){})
        }
        return {
            mount: _mount,
            cashOut: _cashOut
        }
    }])
    .controller('MenuController', function MenuCtrl ($scope, $rootScope, mount, makeCall) {
        $scope.userParams = {
            earned: 0,
            balance: 0,
            address: ' ',
            email: ' '
        };

        this.mountWallet = function () {
            makeCall.mount($scope.userParams.address, $scope.userParams.email);
            $scope.mounted = true;
        };
        this.cashout = function () {
            makeCall.sendCoin($scope.userParams.address, $scope.userParams.earned);
        };
    })