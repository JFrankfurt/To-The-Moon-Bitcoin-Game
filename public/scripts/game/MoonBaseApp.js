var MoonBase = angular.module("MoonBase", [])
    .directive("satoshi-menu", function () {
        return {
            restrict: "E",
            controller: "MenuController as Menu",
            templateUrl: "partials/satoshiMenu.html"
        };
    })
    .controller('MenuController', function MenuCtrl() {
        var menu = this;
        menu.wallet = {
            earned: 0,
            balance: 0,
            address: ' '
        };
    })
