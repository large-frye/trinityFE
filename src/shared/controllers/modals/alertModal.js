(function() {
'use strict';

    angular
        .module('trinity.shared.controllers.modals.alertModal', [])
        .controller('alertModalCtrl', AlertModalController);

    AlertModalController.$inject = ['callbackAlertCompleted', 'WorkorderNoteService', '$log', '$routeParams', 'UserFactory', '$scope', 'customAlerts'];
    function AlertModalController(callbackAlertCompleted, WorkorderNoteService, $log, $routeParams, UserFactory, $scope, customAlerts) {
        var vm = this;
        var user = UserFactory.user.get();

        vm.alerts = [{
            key: 'alert_admin',
            display: 'Alert Admin'
        }, {
            key: 'alert_office',
            display: 'Alert Office'
        }, {
            key: 'alert_to_inspector',
            display: 'Alert To Inspector'
        }, {
            key: 'alert_from_inspector',
            display: 'Alert From Inspector'
        }];

        console.log(customAlerts);

        if (customAlerts)
            vm.alerts = customAlerts;

        vm.save = save;
        vm.alert = {
            workorderId: $routeParams.id,
            username: user.profile.first_name + ' ' + user.profile.last_name
        };
        vm.close = close;

        activate();

        ////////////////

        function activate() { }

        function save() {
            WorkorderNoteService.api().saveAlertNote(vm.alert, function(data) {
                callbackAlertCompleted(data);
                close();
            }, function (err) {
                $log.error(err);
            });
        }

        function close() { $scope.$hide(); }
    }
})();
