(function () {
  'use strict';
  var app = angular.module('trinity', [
      'ngRoute',
      'ngAnimate',
        'ngSanitize',
        'ngAria',
        'shared',
        'routes',
        'trinity.workOrders',
        'trinity.user.services',
        'trinity.account.controllers',
        'trinity.account.services',
        'trinity.account.directives',
        'trinity.inspections',
        'trinity.reports.controllers.report',
        'trinity.reports.services.report',
        'trinity.reports.directives',
        'mgcrea.ngStrap'
  ])

  .config(function($modalProvider) {
      angular.extend($modalProvider.defaults, {
          html: true
      });
  });

  // Bootstrap trinity to document
  angular.bootstrap(document, ['trinity']);
})();