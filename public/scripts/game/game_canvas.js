angular.module('app.game')
.directive('gameCanvas', function($injector) {
        var linkFn = function(scope, elem, attrs) {

        };

        return {
            scope: {

            },
            template: "<div id='ToTheMoon'></div>",
            link: linkFn
        }
    });