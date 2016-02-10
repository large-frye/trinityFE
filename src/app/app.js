(function () {
  'use strict';
  var app = angular.module('trinity', [
      'ngRoute',
      'ngAnimate',
      'ngAria',
      'shared', // Content in our shared module
      'routes',
      'trinity.workOrders', // Work Orders
      'trinity.account',
      'trinity.inspections'
  ]);

  // Bootstrap trinity to document
  angular.bootstrap(document, ['trinity']);
})();
