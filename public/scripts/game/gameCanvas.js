angular.module('app.game')
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
            template: "../partials/main.html"
        }
    })
.controller('CanvasCtrl', function CanvasCtrl(){
        var that = this;
    })