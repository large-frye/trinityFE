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
        'trinity.inspections.services.photo',
        'trinity.directives.inspections.photoSelect',
        'trinty.inspections.directives.workorderLog',
        'trinity.inspections.directives.showLog',
            
        // new angular stype
        'trinity.controllers.admin.reports',
        'trinity.directives.inspections.datePicker',
        'trinity.directives.inspections.timePicker',
        'trintiy.services.inspections.workorderNote',
        'trinity.inspections.services.workorderLogger',

        // settings
        'trinity.controllers.settings.photos',
        'trinity.controllers.shared.addCategory',
        'trinity.settings.services.category',

        /**
         * All new modules need should follow this pattern => {appName}.{directory}.{directory/filename}* this expression
         * can repeat multiple times, depending on file path. If they do not, please update.
         */
        'trinity.shared.controllers.modals.photoModalDelete',
        'trinity.shared.controllers.modals.photoModal',
        'trinity.shared.controllers.modals.photoModalReorder',
        'trinity.shared.directives.photoSort',
        'trinity.resources.controllers.resource',
        'trinity.resources.controllers.trainingContent',
        'trinity.resources.controllers.trainingVideo'
    ])

        .config(function ($modalProvider) {
            angular.extend($modalProvider.defaults, {
                html: true
            });
        });

    // Bootstrap trinity to document
    angular.bootstrap(document, ['trinity']);
})();
