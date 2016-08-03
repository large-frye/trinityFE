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

        // Routes
        'routes',

        // Trinity specific modules
        'trinity.workOrders',
        'trinity.user.services',
        'trinity.account.controllers',
        'trinity.account.services',
        'trinity.account.directives',
        'trinity.reports.controller.inspector',
        'trinity.reports.services.report',
        'trinity.inspections.controller.inspector',
        'trinity.account.controllers.inspector',
        'trinity.reports.directives',
        'trinity.controllers.billing',
        'trinity.services.billing',
        'trinity.filters.shared',
        'trinity.directives.inspections.photoSelect',
        'trinity.inspections.controllers.inspect',
        'trinity.controllers.admin.processing',
        'trinity.inspections.services',
        'trinity.controllers.inspections.admin.form',
        'trinity.controllers.inspections.admin.photos',
        'trinity.controllers.inspections.admin.generate',
        'trinity.controllers.inspections.admin.invoice',

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
        'trinity.shared.controllers.modals.alertModal',
        'trinity.shared.controllers.modals.userDeleteModal',
        'trinity.shared.controllers.modals.calendarModal',
        'trinity.shared.controllers.modals.confirmAlertModal',
        'trinity.shared.services.fileService',
        'trinity.shared.directives.photoSort',
        'trinity.shared.directives.progressBar',
        'trinity.shared.factories.form',
        'trinity.shared.controllers',
        'trinity.shared.directives',
        'trinity.shared.constants',
        'shared.services',

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
        'trinity.inspections.services.photo',
        'trinity.inspections.directives.expertForm',
        'trinity.inspections.directives.systemAlert',
        'trinity.controllers.inspections.inspector.form',
        

        // Account
        'trinity.account.controllers.profile',
        'trinity.account.controllers.users',
        'trinity.account.controller.users.edit'

    ])

        .config(function ($modalProvider) {
            angular.extend($modalProvider.defaults, {
                html: true
            });
        });

    // Bootstrap trinity to document
    angular.bootstrap(document, ['trinity']);
})();
