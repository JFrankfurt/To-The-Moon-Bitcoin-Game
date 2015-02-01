var app = angular.module("MoonBase", [])
    .controller('MenuController', ['$scope', function($scope) {
        $scope.wallet = {
            earned: 0,
            balance: 0,
            address: ' '
        };
    }])
    .directive("myMenu", function () {
        return {
            restrict: "E",
            templateUrl: "partials/satoshiMenu.html"
        };
    });