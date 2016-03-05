/**
 * Created by frye on 9/21/15.
 */
(function (angular) {

    'use strict';

    angular.module('shared.services', ['ngResource'])
        .service('UserFactory', [function () {
            return {
                user: {
                    set: function (user) {
                        this.user = user;
                    },
                    get: function () {
                        return this.user;
                    },
                    clear: function () {
                        this.user = '';
                    },
                    appRole: function(role) {
                        this.role = role;
                    },
                    setBaseOrigin: function() {
                        this.baseOrigin = '/#/' + this.user.appRole;
                    },
                    getNavOptions: function() {
                        var options = {
                            admin: [{
                                parent: 'Inspections',
                                children: [{
                                    name: 'Overview & Stats', link: '/#/admin'
                                }, {
                                    name: 'New Inspection', link: '/#/admin/inspections/new'
                                }],
                                link: this.baseOrigin,
                                icon: 'fa-folder-o'
                            }, {
                                parent: 'Reports',
                                link: this.baseOrigin + '/reports',
                                icon: 'fa-bar-chart-o'
                            }, {
                                parent: 'Inspector Billing',
                                link: this.baseOrigin + '/inspector/billing',
                                icon: 'fa-dollar'
                            }, {
                                parent: 'Calendar',
                                link: this.baseOrigin + '/calendar',
                                icon: 'fa-calendar'
                            }, {
                                parent: 'Maps',
                                link: this.baseOrigin + '/maps',
                                icon: 'fa-map'
                            }, {
                                parent: 'Tasks',
                                link: this.baseOrigin + '/tasks',
                                icon: 'fa-tasks'
                            }, {
                                parent: 'Resources',
                                children: [{
                                    name: 'Resources', link: this.baseOrigin + '/resources'
                                }, {
                                    name: 'Training Material', link: this.baseOrigin + '/resources/training-material'
                                }, {
                                    name: 'Training Videos', link: this.baseOrigin + '/resources/training-videos'
                                }, {
                                    name: 'Office Training Videos', link: this.baseOrigin + '/resources/office-training-videos'
                                }],
                                link: this.baseOrigin + '/resources',
                                icon: 'fa-folder-o'
                            }, {
                                parent: 'Contacts',
                                children: [{
                                    name: 'Admins', link: this.baseOrigin + '/contacts/admins'
                                }, {
                                    name: 'Office Users', link: this.baseOrigin + '/contacts/office-users'
                                }],
                                link: this.baseOrigin + '/contacts',
                                icon: 'fa-folder-o'
                            }],
                            inspector: [{
                                parent: 'Inspections',
                                link: this.baseOrigin
                            }]
                        };

                        return options[this.user.appRole];
                    },
                    initLocalStorageUser: function(user, cb) {
                        this.user = angular.fromJson(user);
                        this.role = this.user.appRole;
                        this.baseOrigin = '/#/' + this.role;
                        cb();
                    }
                },
                // baseOrigin: '/#/' + user.appRole(),
                // navOptions: {
                //     admin: [{
                //         parent: 'Inspections',
                //         children: [{
                //             name: 'Overview & Stats', link: '/#/admin'
                //         }, {
                //             name: 'New Inspection', link: '/#/admin/inspections/new'
                //         }],
                //         link: this.baseOrigin,
                //         icon: 'fa-folder-o'
                //     }, {
                //         parent: 'Reports',
                //         link: this.baseOrigin + '/reports',
                //         icon: 'fa-bar-chart-o'
                //     }, {
                //         parent: 'Inspector Billing',
                //         link: this.baseOrigin + '/inspector/billing',
                //         icon: 'fa-dollar'
                //     }, {
                //         parent: 'Calendar',
                //         link: this.baseOrigin + '/calendar',
                //         icon: 'fa-calendar'
                //     }, {
                //         parent: 'Maps',
                //         link: this.baseOrigin + '/maps',
                //         icon: 'fa-map'
                //     }, {
                //         parent: 'Tasks',
                //         link: this.baseOrigin + '/tasks',
                //         icon: 'fa-tasks'
                //     }, {
                //         parent: 'Resources',
                //         children: [{
                //             name: 'Resources', link: this.baseOrigin + '/resources'
                //         }, {
                //             name: 'Training Material', link: this.baseOrigin + '/resources/training-material'
                //         }, {
                //             name: 'Training Videos', link: this.baseOrigin + '/resources/training-videos'
                //         }, {
                //             name: 'Office Training Videos', link: this.baseOrigin + '/resources/office-training-videos'
                //         }],
                //         link: this.baseOrigin + '/resources',
                //         icon: 'fa-folder-o'
                //     }, {
                //         parent: 'Contacts',
                //         children: [{
                //             name: 'Admins', link: this.baseOrigin + '/contacts/admins'
                //         }, {
                //             name: 'Office Users', link: this.baseOrigin + '/contacts/office-users'
                //         }],
                //         link: this.baseOrigin + '/contacts',
                //         icon: 'fa-folder-o'
                //     }],
                //     inspector: [{
                //         parent: 'Inspections',
                //         link: this.baseOrigin
                //     }]
                // }
            };
        }])

        .service('location', ['$location', '$route', '$rootScope',
            function($location, $route, $rootScope) {
            $location.skipReload = function() {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function() {
                    $route.current = lastRoute;
                    un();
                });
                return $location;
            };
            return $location;
        }])

        .constant("REPORTS", [
            '_ignore_',
            'NEW',
            'CALLED PH',
            'ALERT',
            'SCHEDULED',
            'SENT',
            'INVOICED',
            'NEW PICKUP',
            'RESCHEDULE',
            'IN PROCESS',
            'ON HOLD',
            'INSPECTION COMPLETED',
            'PRE-INVOICE',
            'INSPECTOR ATTENTION REQUIRED',
            'OFFICE ATTENTION REQUIRED',
            'CLOSED',
            'CANCELLED',
            'CANCELED - CLOSED',
            'INSPECTED'
        ])

        .constant('STATUSES', [
            '_',
            {
                id: 1, name: 'New'
            }, {
                id: 2, name: 'Called PH'
            }, {
                id: 3, name: 'Alert'
            }, {
                id: 4, name: 'Scheduled'
            }, {
                id: 5, name: 'Sent'
            }, {
                id: 6, name: 'Invoiced'
            }, {
                id: 7, name: 'New Pickup'
            }, {
                id: 8, name: 'Reschedule'
            }, {
                id: 9, name: 'In Process'
            }, {
                id: 10, name: 'On Hold'
            }, {
                id: 11, name: 'Inspection Completed'
            }, {
                id: 12, name: 'Pre-Invoice'
            }, {
                id: 13, name: 'Inspector Attention Requred'
            }, {
                id: 14, name : 'Office Attention Required'
            }, {
                id: 15, name: 'Closed'
            }, {
                id: 16, name: 'Cancelled'
            }, {
                id: 17, name: 'Cancelled - Closed'
            }, {
                id: 18, name: 'Inspected'
            }
        ])

        .factory('shared', [ function() {
            return {
                getInspectionSideBar: function(id) {
                    return [{
    					parent: 'Work Order Details',
    					link: '/#/admin/inspections/' + id
    				}, {
    					parent: 'Processing Order Details',
    					link: '/#/admin/inspections/processing/' + id
    				}, {
    					parent: 'Inspection Details',
    					link: '/#/admin/inspections/form/' + id
    				}, {
    					parent: 'Inspection Photos',
    					link: '/#/admin/inspections/photos/' + id
    				}, {
    					parent: 'Generate Report',
    					link: '/#/admin/inspections/generate/' + id
    				}, {
    					parent: 'Invoice Details',
    					link: '/#/admin/inspections/invoice/' + id
    				}];
                }
            };
        }]);



}(angular));
