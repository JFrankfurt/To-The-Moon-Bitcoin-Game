var MoonBase = angular.module("MoonBase", [])
    .factory('Data', function() {

    })
    .directive("mount", function () {
        return {
            restrict: "E",
            controller: "MenuController as Menu",
            templateUrl: "partials/mount.html"
        };
    })
    .directive('cashout', function () {
        return {
            restrict: "E",
            controller: "MenuController as Menu",
            templateUrl: "partials/cashout.html"
        }
    })
    .controller('MenuController', function MenuCtrl() {
        var menu = this;
        menu.wallet = {
            earned: 0,
            balance: 0,
            address: ' '
        };
    })
