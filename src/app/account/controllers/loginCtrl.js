/**
 * Created by andrewfrye on 1/19/16.
 */
(function() {
    angular.module('trinity.account.loginCtrl', [])

        .controller('loginCtrl', ['$scope', 'accountService', '$location', 'accountInfo', '$route', '$timeout', 'UserFactory', '$rootScope',
            function($scope, accountService, $location, accountInfo, $route, $timeout, UserFactory, $rootScope) {

                if ($route.current.$$route.originalPath === '/sign-out') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    $location.path('/sign-in');
                    $timeout(function() {
                        UserFactory.user.clear();
                        $scope.$apply();
                    });

                    $rootScope.$broadcast('LOGOUT');
                }

                $scope.signIn = function() {
                    accountService.authenticate($scope.user, function(response) {
                        localStorage.setItem('user', angular.toJson(response[0].user));
                        localStorage.setItem('token', response[1].token);
                        $rootScope.$broadcast('LOGIN');
                        $rootScope.$on('PRELOAD_COUNTS', function() {
                            $scope.loading = true;
                            console.log('here');
                        });
                        $location.path('/account');

                        // Let's reset our margin-left on .content-wrapper
                        angular.element('.content-wrapper')
                            .removeClass('no-margin-left');
                    }, function(err) {
                        $scope.error = 'Sign in failed, please try again.';
                        console.log("error: %o", err);
                    });
                };

                $(function () {
                    $('input').iCheck({
                        checkboxClass: 'icheckbox_flat',
                        radioClass: 'iradio_flat',
                        increaseArea: '20%' // optional
                    });
                });
            }

        ]);
})();
