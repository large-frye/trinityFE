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
