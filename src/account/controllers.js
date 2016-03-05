/**
 * Created by andrewfrye on 1/19/16.
 */
(function() {
    angular.module('trinity.account.controllers', [])
        .controller('loginCtrl', ['$scope', 'accountService', '$location', 'accountInfo', '$route', '$timeout', 'UserFactory', '$rootScope', 'UserService',
            function($scope, accountService, $location, accountInfo, $route, $timeout, UserFactory, $rootScope, UserService) {

                UserFactory.user.clear();
                $scope.user = null;

                if ($route.current.$$route.originalPath === '/sign-out') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    $location.path('/sign-in');

                    // destroy user's session;
                    UserService.destroy(function(d) {

                    }, function(e) {
                        window.console && console.log(e);
                    });

                    $timeout(function() {
                        UserFactory.user.clear();
                        $scope.$apply();
                    });

                    $rootScope.$broadcast('LOGOUT');
                }

                angular.element('.content-wrapper').addClass('no-margin-left');

                $scope.signIn = function() {
                    accountService.authenticate($scope.user, function(response) {

                        UserService.destroy(function() {
                            //
                        }, function(e) {
                            console.log(e);
                        });

                        var user = response[0].user;
                        var token = response[1].token;

                        // Set our user to our factory
                        UserFactory.user.set(user);
                        UserFactory.user.setBaseOrigin();
                        $scope.options = UserFactory.user.getNavOptions();

                        // Store user in localStorage
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
        ])

        .controller('adminHomeCtrl', ['$scope', 'workOrderService', 'UserFactory', 'counts',
            function($scope, workOrderService, UserFactory, counts) {

                $scope.timeFilters = ['Today', 'Yesterday', 'Tomorrow', 'This Week',
                'Next Week', 'Last Week', 'This Month', 'Next Month', 'Last Month',
                'This Year', 'Last Year'];

                angular.element('.content-wrapper').addClass('no-margin-left');

                $scope.timeTypes = [{
                    name: 'Ladder Assist',
                    map: -1
                }, {
                    name: 'Basic',
                    map: 0
                }, {
                    name: 'Expert'
                }, {
                    name: 'Total Inspections'
                }, {
                    name: 'New Orders'
                }, {
                    name: 'Cancelled'
                }];

                $scope.basic = counts.basic[0];
                $scope.expert = counts.expert[0];

                // options
                $scope.options = [{
                    parent: 'Inspections',
                    children: [{
                        name: 'Overview & Stats', link: '/#/account'
                    }, {
                        name: 'New Inspection', link: '/#/account/inspections/new'
                    }],
                    link: '/#/account'
                }];
            }
        ])

        .controller('inspectorHomeCtrl', ['$scope', 'items', function($scope, items) {
            // clear side bar
            angular.element('.content-wrapper').addClass('no-margin-left');

            $scope.items = items.orders;
        }]);
})();
