(function () {
    'use strict';

    angular
        .module('trinity.account.controller.users.edit', [])
        .controller('usersEditCtrl', UsersEditController);

    UsersEditController.$inject = ['user', 'accountService', '$log', 'alert', 'FORM'];
    function UsersEditController(user, accountService, $log, alert, FORM) {
        var vm = this;

        vm.user = user.user;
        vm.userTypes = [{
            name: 'Client/Adjuster',
            id: 4
        }, {
                name: 'Inspector',
                id: 3
            }, {
                name: 'Admin',
                id: 2
            }];
        vm.updateUser = updateUser;

        activate();

        ////////////////

        function activate() {
            vm.newUser = true;
            if (typeof vm.user !== 'undefined') 
                setUserType();
        }

        function setUserType() {
            vm.newUser = false;
            vm.userType = vm.userTypes.filter(function (type) {
                return vm.user.roles_user[0].role_id === type.id;
            })[0];
        }

        function updateUser() {
            return accountService.updateProfile(vm.user, function (data) {
                vm.newUser = false;
                vm.alerts = alert.add({
                    title: 'save',
                    content: 'User updated.',
                    type: 'success'
                }, FORM.SAVE_LENGTH);
            }, function (err) {
                vm.newUser = false;
                $log.log(err);
                vm.alerts = alert.add({
                    title: 'save',
                    content: 'User not updated.',
                    type: 'danger'
                });
            });
        }
    }
})();