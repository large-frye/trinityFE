(function() {
'use strict';

    angular
        .module('trinity.account.controllers.profile', [])
        .controller('profileCtrl', ProfileController);

    ProfileController.$inject = ['userData', 'accountService', 'UserFactory', '$log', 'alert', 'FORM'];
    function ProfileController(userData, accountService, UserFactory, $log, alert, FORM) {
        var vm = this;
        vm.user = userData;
        var appRole = UserFactory.user.get().appRole;

        vm.updatePassword = updatePassword;
        vm.updateProfile = updateProfile;

        activate();

        ////////////////

        function activate() { }

        function updatePassword() {
            var payload = {
                currentPassword: vm.currentPassword,
                newPassword: vm.newPassword
            };
            return accountService.updatePassword(payload, function(user) {
                vm.alerts = alert.add({
                    title: 'Profile',
                    content: 'Password updated.',
                    type: 'success'
                }, FORM.SAVE_LENGTH);
                vm.currentPassword = null;
                vm.newPassword = null;
            }, function(err) {
                $log.error(err);
                vm.alerts = alert.add({
                    title: 'Current Password is not the same.',
                    content: 'Current password is not correct.',
                    type: 'danger'
                });
            });
        }

        function updateProfile() {
            return accountService.updateProfile(vm.user, function(data) {
                vm.user = data.user;
                var user = data.user;
                user.appRole = appRole;

                // Update local storage & user factory
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(user));
                UserFactory.user.set(user);

                vm.alerts = alert.add({
                    title: 'Profile',
                    content: 'Profile updated.',
                    type: 'success'
                }, FORM.SAVE_LENGTH);
            }, function(err) {
                $log.error(err);
                vm.alerts = alert.add({
                    title: 'Profile',
                    content: 'Profile was not updated.',
                    type: 'danger'
                });
            });
        }
    }
})();