/* global angular */

(function () {
    'use strict';
    angular.module('trinity', [

        // Third party/angular libs
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ngAria',
        'mgcrea.ngStrap',

        // Shared
        'shared',
        'routes',
    
        // Trinity specific modules
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
        'trinity.directives.inspections.photoSelect',
        
            
        // new angular stype
        'trinity.controllers.admin.reports',
        'trinity.directives.inspections.datePicker',
        'trinity.directives.inspections.timePicker',
        'trintiy.services.inspections.workorderNote',

        // settings
        'trinity.controllers.settings.photos',
        'trinity.controllers.shared.addCategory',
        'trinity.settings.services.category',

        /**
         * All new modules need should follow this pattern => {appName}.{directory}.{directory/filename}* this expression
         * can repeat multiple times, depending on file path. If they do not, please update.
         */

        // Shared Modules
        'trinity.shared.controllers.modals.photoModalDelete',
        'trinity.shared.controllers.modals.photoModal',
        'trinity.shared.controllers.modals.photoModalReorder',
        'trinity.shared.controllers.modals.deleteResource',
        'trinity.shared.directives.photoSort',
        'trinity.shared.directives.progressBar',
        'trinity.shared.factories.form',
        'trinity.shared.controllers',
        'trinity.shared.directives',
        'trinity.shared.constants',

        // Resource Modules
        'trinity.resources.controllers.resource',
        'trinity.resources.controllers.trainingContent',
        'trinity.resources.controllers.trainingVideo',
        'trinity.resources.services.resource',

        // Inspection Modules
        'trinity.inspections.services.workorderLogger',
        'trinty.inspections.directives.workorderLog', // TODO: mispelled
        'trinity.inspections.directives.deleteNotes',
        'trinity.inspections.directives.showLog',
        'trinity.inspections.services.photo'
    ])

        .config(function ($modalProvider) {
            angular.extend($modalProvider.defaults, {
                html: true
            });
        });

    // Bootstrap trinity to document
    angular.bootstrap(document, ['trinity']);
})();
