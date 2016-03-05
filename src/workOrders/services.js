(function () {
    'use strict';
    angular.module('trinity.workOrders.services', ['ngResource'])
        .service('workOrderService', ['$resource',
            function ($resource) {
                return $resource('http://api.trinity.dev/:userType/workorders/:action/:param1/:param2/:param3/:param4/:param5', {
                    "action": "@action"
                }, {
                    "list": {
                        "method": "GET",
                        "headers": {
                            "Accept": "application/json"
                        }
                    },
                    listByTime: {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json'
                        },
                        params: {
                            action: 'time',
                            userType: 'admin'
                        }
                    },
                    "get": {
                        "method": "GET",
                        "headers": {
                            "Accept": "application/json"
                        },
                        "params": {
                            "action": "find",
                            userType: 'admin'
                        },
                        "withCredentials": true
                    },
                    counts: {
                        "method": "GET",
                        "headers": {
                            "Accept": "application/json"
                        },
                        "params": {
                            "action": 'counts',
                            userType: 'admin'
                        },
                        withCredentials: true
                    },
                    "daily": {
                        "method": "GET",
                        "headers": {
                            "Accept": "application/json"
                        },
                        "params": {
                            "action": "date",
                            userType: 'admin'
                        },
                        "withCredentials": true,
                        "isArray": true
                    },
                    inspectorDaily: {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json'
                        },
                        params: {
                            userType: 'inspector',
                        },
                        withCredentials: true
                    }
                });
            }
        ]);
})();
