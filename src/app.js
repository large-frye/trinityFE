/* global angular */

(function () {
    'use strict';
    angular.module('trinity', [
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
        'trinity.reports.controller.inspector',
        'trinity.reports.services.report',
        'trinity.inspections.controller.inspector',
        'trinity.reports.directives',
        'trinity.controllers.invoice',
        'trinity.services.invoice',
        'trinity.filters.shared',
        'mgcrea.ngStrap',
            
        // new angular stype
        'trinity.controllers.admin.reports'
    ])

        .config(function ($modalProvider) {
            angular.extend($modalProvider.defaults, {
                html: true
            });
        })
        
        .run(['$locale', function($locale) {
            console.log($locale);
        }]);

    // Bootstrap trinity to document
    angular.bootstrap(document, ['trinity']);
})();
