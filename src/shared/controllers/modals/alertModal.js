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
            key: 'alert_office',
            display: 'Alert From Inspector'
        }];

        if (customAlerts) {
            vm.alerts = vm.alerts.filter(function(item) {
                return customAlerts.indexOf(item.key) != -1; 
            });
        }

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