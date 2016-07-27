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
                                parent: 'New Inspection',
                                link: '/#/admin/inspections/new',
                                icon: 'fa-folder-o',
                                newTab: true
                            }, {
                                parent: 'Reports',
                                link: '/#/admin',
                                icon: 'fa-bar-chart-o'
                            }, {
                                parent: 'Inspector Billing',
                                link: '/#/' + this.user.appRole + '/billing',
                                icon: 'fa-dollar'
                            }, /* {
                                parent: 'Calendar',
                                link: '/#/' + this.user.appRole + '/calendar',
                                icon: 'fa-calendar'
                            }, {
                            TODO: these two tasks are quite involved and will not be done for initial build.
                                parent: 'Maps',
                                link: '/#/' + this.user.appRole + '/maps',
                                icon: 'fa-map'
                            }, */ {
                                parent: 'Resources',
                                children: [{
                                    name: 'Resources', link: '/#/' + this.user.appRole + '/resources'
                                }, {
                                    name: 'Training Material', link: '/#/' + this.user.appRole + '/resources/training-material'
                                }, {
                                    name: 'Training Videos', link: '/#/' + this.user.appRole + '/resources/training-videos'
                                }
                                // ,
                                // {
                                //     name: 'Office Training Videos', link: '/#/' + this.user.appRole + '/resources/office-training-videos'
                                // }
                                ],
                                link: '/#/' + this.user.appRole + '/resources',
                                icon: 'fa-folder-o'
                            },
                            // {
                            //     parent: 'Contacts',
                            //     children: [{
                            //         name: 'Admins', link: '/#/' + this.user.appRole + '/contacts/admins'
                            //     }, {
                            //         name: 'Office Users', link: '/#/' + this.user.appRole + '/contacts/office-users'
                            //     }],
                            //     link: '/#/' + this.user.appRole + '/contacts',
                            //     icon: 'fa-folder-o'
                            // }
                            // ,
                            {
                                parent: 'Settings',
                                children: [{
                                    name: 'Photos', link: '/#/admin/settings/photos'
                                }, {
                                    name: 'Users', link: '/#/admin/users'
                                }]
                            }, {
                                parent: 'Tasks',
                                link: '/#/' + this.user.appRole + '/tasks',
                                icon: 'fa-tasks'
                            }],
                            inspector: [{
                                parent: 'Inspections',
                                children: [{
                                    name: 'Submit new pickup', link: '/#/inspector/inspections/new'
                                }],
                                link: '/#/' + this.user.appRole
                            }, {
                                parent: 'Reports',
                                link: '/#/inspector/reports'
                            }, {
                                parent: 'Inspector Billing',
                                link: '/#/inspector/billing'
                            }, 
                            // {
                            //     parent: 'Calendar',
                            //     link: '/#/inspector/calendar'
                            // }, 
                            // {
                            //     parent: 'Maps',
                            //     link: '/#/inspector/maps'
                            // }, 
                            {
                                parent: 'Resources',
                                children: [{
                                    name: 'Resources', link: '/#/inspector/resources'
                                }, {
                                    name: 'Training Material', link: '/#/inspector/resources/training-material'
                                }, {
                                    name: 'Training Videos', link: '/#/inspector/resources/training-videos'
                                }],
                                link: '/#/inspector/resources'
                            }, {
                                parent: 'Tasks',
                                link: '/#/inspector/tasks'
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
                }
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

        .factory('alert', ['$timeout', function($timeout) {
            return {
                add: function(alert, delay) {
                    this.alerts = this.alert || [];
                    this.alerts.push(alert);
                    var self = this;
                    $timeout(function() {
                        self.alerts.pop();
                    }, delay);

                    return this.alerts;
                }
            };
        }])

        .factory('shared', [ function() {
            return {
                getInspectionSideBar: function(id) {
                    return [{
    					parent: 'Work Order Details',
    					link: '/#/admin/inspections/' + id
    				}, {
    					parent: 'Processing Details',
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
    				}
                    // Per request to not show anymore
                    // {
    				// 	parent: 'Invoice Details',
    				// 	link: '/#/admin/inspections/invoice/' + id
    				// }
                    ];
                },
                getInspectorInspectionBar: function(id) {
                    return [{
                        parent: 'Inspection Details',
                        link: '/#/inspector/inspections/' + id
                    }, {
                        parent: 'Inspection Photos',
                        link: '/#/inspector/inspections/photos/' + id
                    }, {
                        parent: 'Submit New Pickup',
                        link: '/#/inspector/inspections/new'
                    }];
                },
                getReportSideBar: function() {
                    return [{
                        parent: 'All Inspections',
                        link: '/#/admin/reports'
                    }, {
                        parent: 'All Open Inspections',
                        link: '/#/admin/reports/open'
                    }, {
                        parent: 'Admin Attention Required',
                        link: '/#/admin/reports/admin-attention-required'
                    }, {
                        parent: 'Office Attention Required',
                        link: '/#/admin/reports/office-attention-required'
                    }, {
                        parent: 'Inspector Attention Required',
                        link: '/#/admin/reports/inspector-attention-required'
                    }, {
                        parent: 'New Inspections',
                        link: '/#/admin/reports/new'
                    }, {
                        parent: 'New Pickups',
                        link: '/#/admin/reports/new-pickups'
                    }, {
                        parent: 'In Process/Reschedule',
                        link: '/#/admin/reports/process-reschedule'
                    }, {
                        parent: 'On Hold',
                        link: '/#/admin/reports/on-hold'
                    }, {
                        parent: 'Scheduled',
                        link: '/#/admin/reports/scheduled'
                    }, {
                        parent: 'Post Inspection Date',
                        link: '/#/admin/reports/post-inspection-date'
                    }, {
                        parent: 'Inspected',
                        link: '/#/admin/reports/inspected'
                    }, {
                        parent: 'Reporting',
                        link: '/#/admin/reports/reporting'
                    }, {
                        parent: 'Inv. Alacrity',
                        link: '/#/admin/reports/inv-alacrity'
                    }, {
                        parent: 'Invoicing',
                        link: '/#/admin/reports/invoicing'
                    }, {
                        parent: 'Closed',
                        link: '/#/admin/reports/closed'
                    }, {
                        parent: 'Cancelled',
                        link: '/#/admin/reports/cancelled'
                    }, {
                        parent: 'Cancelled Closed',
                        link: '/#/admin/reports/cancelled-closed'
                    }, {
                        parent: 'Today\'s Inspections',
                        link: '/#/admin/reports/today'
                    }, {
                        parent: 'Tomorrow\'s Inspections',
                        link: '/#/admin/reports/tomorrow'
                    }, {
                        parent: 'Yesterday\'s Inspections',
                        link: '/#/admin/reports/yesterday'
                    }, {
                        parent: 'This Week\'s Inspections',
                        link: '/#/admin/reports/this-week'
                    }, {
                        parent: 'Next Week\'s Inspections',
                        link: '/#/admin/reports/next-week'
                    }, {
                        parent: 'Last Week\'s Inspections',
                        link: '/#/admin/reports/last-week'
                    }, {
                        parent: 'This Month\'s Inspections',
                        link: '/#/admin/reports/this-month'
                    }, {
                        parent: 'Next Month\'s Inspections',
                        link: '/#/admin/reports/next-month'
                    }, {
                        parent: 'Last Month\'s Inspections',
                        link: '/#/admin/reports/last-month'
                    }, {
                        parent: 'This Years\'s Inspections',
                        link: '/#/admin/reports/this-year'
                    }, {
                        parent: 'Last Year\'s Inspections',
                        link: '/#/admin/reports/last-year'
                    }];
                },
                getReportInspectorSidebar: function() {
                    return [{
                        parent: 'All Open Inspections (default)',
                        link: '/#/inspector/reports'
                    }, {
                        parent: 'New Pickups',
                        link: '/#/inspector/reports/new-pickups'
                    }, {
                        parent: 'Insp. Input Required',
                        link: '/#/inspector/reports/insp-input-required'
                    }, {
                        parent: 'Today\'s Inspections',
                        link: '/#/inspector/reports/today'
                    }, {
                        parent: 'Tomorrow\'s Inspections',
                        link: '/#/inspector/reports/tomorrow'
                    }, {
                        parent: 'Yesterday\'s Inspections',
                        link: '/#/inspector/reports/yesterday'
                    }, {
                        parent: 'This Week\'s Inspections',
                        link: '/#/inspector/reports/this-week'
                    }, {
                        parent: 'Next Week\'s Inspections',
                        link: '/#/inspector/reports/next-week'
                    }, {
                        parent: 'Last Week\'s Inspections',
                        link: '/#/inspector/reports/last-week'
                    }, {
                        parent: 'This Month\'s Inspections',
                        link: '/#/inspector/reports/this-month'
                    }, {
                        parent: 'Next Month\'s Inspections',
                        link: '/#/inspector/reports/next-month'
                    }, {
                        parent: 'Last Month\'s Inspections',
                        link: '/#/inspector/reports/last-month'
                    }];
                }
            };
        }])

        .service('env', [ function() {
            return {
                getEndpoint: function() {
                    if (location.href.match(/localhost/) !== null) {
                        // return 'http://52.2.169.5';
                        return 'http://api.trinity.dev/api';
                    }
                    return 'http://52.205.216.249/api';
                }
            };
        }]);



}(angular));
