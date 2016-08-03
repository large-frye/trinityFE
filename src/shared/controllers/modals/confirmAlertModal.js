(function() {
'use strict';

    angular
        .module('trinity.shared.controllers.modals.confirmAlertModal', [])
        .controller('confirmAlertModalCtrl', ConfirmAlertModalController);

    ConfirmAlertModalController.$inject = ['confirmDelete', 'denyDelete', '$log', '$routeParams', 'UserFactory', '$scope'];
    function ConfirmAlertModalController(confirmDelete, denyDelete, $log, $routeParams, UserFactory, $scope) {
        var vm = this;
        var user = UserFactory.user.get();
        vm.confirmDeleteAlert = confirmDeleteAlert;
        vm.close = close;
        vm.cancel = cancel;
        
        activate();

        ////////////////

        function activate() { }

        function close() { $scope.$hide(); }

        function confirmDeleteAlert() {
            confirmDelete();
            close();
        }

        function cancel() {
            denyDelete();
            close();
        }
    }
})();