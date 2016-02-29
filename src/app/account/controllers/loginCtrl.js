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

                angular.element('.content-wrapper').addClass('no-margin-left');

                $scope.signIn = function() {
                    accountService.authenticate($scope.user, function(response) {
                        var user = response[0].user;
                        var token = response[1].token;

                        // Set our user to our factory
                        UserFactory.user.set(user);

                        localStorage.setItem('user', angular.toJson(user));
                        localStorage.setItem('token', token);

                        $rootScope.$broadcast('LOGIN');
                        $rootScope.$on('PRELOAD_COUNTS', function() {
                            $scope.loading = true;
                        });

                        // Let's reset our margin-left on .content-wrapper
                        angular.element('.content-wrapper')
                            .removeClass('no-margin-left');

                        $location.path('/' + user.appRole);

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
