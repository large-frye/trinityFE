(function() {
'use strict';

    angular
        .module('trinity.shared.controllers.modals.userDeleteModal', [])
        .controller('userDeleteModalCtrl', UserDeleteModalController);

    UserDeleteModalController.$inject = ['accountService', 'callbackAlertCompleted', 'scope', '$scope', '$log'];
    function UserDeleteModalController(accountService, callbackAlertCompleted, scope, $scope, $log) {
        var vm = this;

        vm.close = close;
        vm.deleteUser = deleteUser;

        activate();

        ////////////////

        function activate() { }

        function deleteUser() {
            return accountService.deleteUser({
                id2: scope.id
            }, function(data) {
                close();
                callbackAlertCompleted(data);
            }, function(err) {
                $log.error(err);
            });
        }

        function close() {
            $scope.$hide();
        }
    }
})();