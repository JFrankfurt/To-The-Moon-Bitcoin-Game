angular.module('app.menu', [])
.config(function($stateProvider) {
        $stateProvider
            .state('menu', {
                url: '',
                template: '<h2>There is a menu here</h2>'
            });
    })

.controller('MenuController', function() {

});
