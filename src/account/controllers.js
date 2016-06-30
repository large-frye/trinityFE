/**
 * Created by andrewfrye on 1/19/16.
 */
(function() {
    angular.module('trinity.account.controllers', [])
        .controller('loginCtrl', ['$scope', 'accountService', '$location', 'accountInfo', '$route', '$timeout', 'UserFactory',
            '$rootScope', 'UserService',
            function($scope, accountService, $location, accountInfo, $route, $timeout, UserFactory, $rootScope, UserService) {

                UserFactory.user.clear();
                $scope.user = null;

                $scope.test = function() { console.log('andrew'); }

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
                    console.log('here');
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

        .controller('adminHomeCtrl', ['$scope', 'workOrderService', 'UserFactory', 'counts', 'shared', '$filter',
            function($scope, workOrderService, UserFactory, counts, shared, $filter) {

                $scope.timeFilters = ['Today', 'Yesterday', 'Tomorrow', 'This Week',
                'Next Week', 'Last Week', 'This Month', 'Next Month', 'Last Month',
                'This Year', 'Last Year'];

                $scope.timeTypes = [{
                    name: 'Ladder Assist',
                    map: -1
                }, {
                    name: 'Ladder Assist w/ Report',
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

                $scope.topTableStatuses = [
                    { name: 'Admin Attn.',  key: 'admin_attention_required' }, 
                    { name: 'Office Attn.', key: 'office_attention_required' },
                    { name: 'Insp. Attn.', key: 'inspector_attention_required' }, 
                    { name: 'On Hold', key: 'on_hold' },
                    { name: 'Pickups', key: 'new_pickups' },
                    { name: 'New', key: 'new' },
                    { name: 'Reschedule', key: 'reschedule' },
                    { name: 'In Process', key: 'in_process' }
                ];
                $scope.bottomTableStatuses = [
                    { name: 'Scheduled', key: 'scheduled' },
                    { name: 'Post Insp.', key: 'post_inspection_date' },
                    { name: 'Inspected', key: 'inspected' },
                    { name: 'Reporting', key: 'reporting' },
                    { name: 'Inv. Alacrity', key: 'inv_alacrity' },
                    { name: 'Invoicing', key: 'invoicing' },
                    { name: 'Cancelled', key: 'cancelled' }];
                
                $scope.items = [ counts.basic[0], counts.expert[0], counts.ladderAssist[0] ];
                $scope.basic = counts.basic[0];
                $scope.expert = counts.expert[0];
                $scope.ladderAssist = counts.ladderAssist[0];
                $scope.counts = counts;

                /**
                 * Set report link, would've link to do this in angular scope. Add it if you'd like.
                 */
                $scope.setReportLink = function(link) {
                    return '/#/admin/reports/' + $filter('replace')(link, '_', '-');
                };

                for (var key in $scope.basic) {
                    $scope.basic[key] = parseInt($scope.basic[key], 10);
                }
                for (var key in $scope.expert) {
                    $scope.expert[key] = parseInt($scope.expert[key], 10);
                }

                // options
                $scope.options = shared.getReportSideBar();
            }
        ]);
})();
