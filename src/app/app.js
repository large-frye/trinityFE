(function () {
  'use strict';
  var app = angular.module('trinity', [
    'ngRoute',
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'shared', // Content in our shared module
    'routes',
    'trinity.workOrders' // Work Orders
  ]);

  app.config(
    ['$routeProvider', '$mdThemingProvider',
      function ($routeProvider, $mdThemingProvider) {

        var trinityRedMap = $mdThemingProvider.extendPalette('red', {
          '500': '78001f'
        });

        $mdThemingProvider.definePalette('trinityRed', trinityRedMap);

        $mdThemingProvider.theme('default')
          .primaryPalette('teal')
          .accentPalette('cyan')
          .backgroundPalette('grey');

      }]
  );

  // Bootstrap trinity to document
  angular.bootstrap(document, ['trinity']);
})();
