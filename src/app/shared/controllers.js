/**
 * Created by frye on 9/21/15.
 */
(function () {
  'use strict';

  var app = angular.module('shared.controllers', [])

    .controller('navCtrl', ['$scope', 'UserFactory', '$rootScope',
        function($scope, UserFactory, $rootScope) {

        var initUser = function() {
            UserFactory.user.set(angular.fromJson(localStorage.getItem('user')));
            $scope.user = UserFactory.user.get();
        };

        var baseOrigin = '/#/admin';

        // Add our navbar options here
        $scope.options = [{
            parent: 'Inspections',
            children: [{
                name: 'Overview & Stats', link: '/#/admin'
            }, {
                name: 'New Inspection', link: '/#/admin/inspections/new'
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

        $rootScope.$on('LOGOUT', function() {
            $scope.user = UserFactory.user.clear();
        });

        $rootScope.$on('LOGIN', function() {
            initUser();
        });

        initUser();
    }])

    .controller('sidebarCtrl', ['$scope', function($scope) {
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

        $scope.hide = function() {
            if ($location.url().match(/account/) === null) {
                // Real bad, hack not a good idea
                angular.element('.content-wrapper')
                    .addClass('no-margin-left');

                return;
            }

            return true;
        };
    }]);
})();
