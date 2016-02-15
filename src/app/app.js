(function () {
  'use strict';
  var app = angular.module('trinity', [
      'ngRoute',
      'ngAnimate',
      'ngSanitize',
      'ngAria',
      'shared', // Content in our shared module
      'routes',
      'trinity.workOrders', // Work Orders
      'trinity.account',
      'trinity.inspections',
      'trinity.user',
      'trinity.reports.controllers.report',
      'trinity.reports.services.report',
      'mgcrea.ngStrap'
  ])

  .config(function($modalProvider) {
      angular.extend($modalProvider.defaults, {
          html: true
      });
  })

  // Bootstrap trinity to document
  angular.bootstrap(document, ['trinity']);
})();
