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
        'trinity.account.controllers.inspector',
        'trinity.reports.directives',
        'trinity.controllers.billing',
        'trinity.services.billing',
        'trinity.filters.shared',
        'mgcrea.ngStrap',
        'trinity.shared.factories.form',
            
        // new angular stype
        'trinity.controllers.admin.reports'
    ])

        .config(function ($modalProvider) {
            angular.extend($modalProvider.defaults, {
                html: true
            });
        });

    // Bootstrap trinity to document
    angular.bootstrap(document, ['trinity']);
})();
