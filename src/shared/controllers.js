/**
 * Created by frye on 9/21/15.
 */
(function () {
    'use strict';

    var app = angular.module('shared.controllers', [])

        .controller('navCtrl', ['$scope', 'UserFactory', '$rootScope', '$location',
            function ($scope, UserFactory, $rootScope, $location) {

                var initUser = function () {
                    UserFactory.user.set(angular.fromJson(localStorage.getItem('user')));
                    $scope.user = UserFactory.user.get();
                    setOptions();
                };

                var setOptions = function() {
                    if (!$scope.options) {
                        try {
                            $scope.options = UserFactory.user.getNavOptions();
                        } catch (e) {
                            var user = localStorage.getItem('user');
                            if (user) {
                                UserFactory.user.initLocalStorageUser(user, function () {
                                    $scope.options = UserFactory.user.getNavOptions();
                                });
                            } else {
                                $location.path('/sign-out');
                            }
                        }
                    }
                };

                function allowedPath() {
                    var notAllowedPaths = ['/sign-in', '/sign-out'];
                    if (notAllowedPaths.indexOf($location.path()) !== -1) {
                        localStorage.removeItem('user');
                        $scope.user = false;
                        return false;
                    }

                    return true;
                }

                $scope.$on('LOGIN', function () {
                    $scope.options = UserFactory.user.getNavOptions();
                });

                $scope.$on('LOGOUT', function () {
                    $scope.options = {};
                });

                $rootScope.$on('LOGOUT', function () {
                    $scope.user = UserFactory.user.clear();
                });

                $rootScope.$on('LOGIN', function () {
                    initUser();
                });

                if (allowedPath()) {
                    initUser();
                }

                // Set view
                if (isWorkorderView($location)) {
                    localStorage.setItem('workorderView', true);
                } else {
                    localStorage.removeItem('workorderView');
                }

            }])

        .controller('sidebarCtrl', ['$scope', function ($scope) {
            var baseOrigin = '/#/admin';

            // options
            $scope.options = [{
                parent: 'Inspections',
                children: [{
                    name: 'Overview & Stats', link: '/#/account'
                }, {
                    name: 'New Inspection', link: '/#/account/inspections/new'
                }],
                link: baseOrigin,
                icon: 'fa-folder-o'
            }, {
                parent: 'Reports',
                link: baseOrigin + '/reports',
                icon: 'fa-bar-chart-o'
            }, {
                parent: 'Inspector Billing',
                link: baseOrigin + '/inspector/billing',
                icon: 'fa-dollar'
            }, {
                parent: 'Calendar',
                link: baseOrigin + '/calendar',
                icon: 'fa-calendar'
            }, {
                parent: 'Maps',
                link: baseOrigin + '/maps',
                icon: 'fa-map'
            }, {
                parent: 'Tasks',
                link: baseOrigin + '/tasks',
                icon: 'fa-tasks'
            }, {
                parent: 'Resources',
                children: [{
                    name: 'Resources', link: baseOrigin + '/resources'
                }, {
                    name: 'Training Material', link: baseOrigin + '/resources/training-material'
                }, {
                    name: 'Training Videos', link: baseOrigin + '/resources/training-videos'
                }, {
                    name: 'Office Training Videos', link: baseOrigin + '/resources/office-training-videos'
                }],
                link: baseOrigin + '/resources',
                icon: 'fa-folder-o'
            }, {
                parent: 'Contacts',
                children: [{
                    name: 'Admins', link: baseOrigin + '/contacts/admins'
                }, {
                    name: 'Office Users', link: baseOrigin + '/contacts/office-users'
                }],
                link: baseOrigin + '/contacts',
                icon: 'fa-folder-o'
            }];

            $scope.hide = function () {
                if ($location.url().match(/account/) === null) {
                    // Real bad, hack not a good idea
                    angular.element('.content-wrapper')
                        .addClass('no-margin-left');

                    return;
                }

                return true;
            };
        }]);

        function isWorkorderView($location) {
            var regex = new RegExp('admin/inspections');
            return regex.test($location.url());
        }
})();
