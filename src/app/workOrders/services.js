(function () {
    'use strict';
    angular.module('trinity.workOrders.services', ['ngResource'])
        .service('workOrderService', ['$resource',
            function ($resource) {
                return $resource('http://api.trinity.dev/account/workorders/:action/:param1/:param2/:param3/:param4/:param5', {
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
                            action: 'time'
                        }
                    },
                    "get": {
                        "method": "GET",
                        "headers": {
                            "Accept": "application/json"
                        },
                        "params": {
                            "action": "find"
                        },
                        "withCredentials": true
                    },
                    counts: {
                        "method": "GET",
                        "headers": {
                            "Accept": "application/json"
                        },
                        "params": {
                            "action": 'counts'
                        }
                    },
                    "daily": {
                        "method": "GET",
                        "headers": {
                            "Accept": "application/json"
                        },
                        "params": {
                            "action": "date"
                        },
                        "withCredentials": true,
                        "isArray": true
                    }
                })
            }
        ])
})()
