(function () {
    'use strict';

    angular
        .module('trinity.account.controllers.users', [])
        .controller('usersCtrl', UserController);

    UserController.$inject = ['userData', '$modal', 'accountService', '$rootScope'];
    function UserController(userData, $modal, accountService, $rootScope) {
        var vm = this;
        vm.users = userData.usersByRoles;

        vm.admins = userData.usersByRoles[2];
        vm.inspectors = userData.usersByRoles[3];
        vm.clients = userData.usersByRoles[4];

        vm.deleteUser = deleteUser;

        activate();

        ////////////////

        function activate() { }

        function deleteUser($event, id) {
            $event.preventDefault();

            var scope = $rootScope.$new();
            scope.id = id;

            var modal = $modal({
                scope: scope,
                templateUrl: 'src/partials/modals/users/delete.html',
                controller: 'userDeleteModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    callbackAlertCompleted: function() {
                        return function(data) {
                            vm.users = data.users;
                        };
                    },
                    scope: function() {
                        return scope;
                    }
                },
                show: false
            });
            modal.$promise.then(modal.show);
        }
    }
})();
