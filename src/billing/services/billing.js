(function() {
'use strict';

    angular
        .module('trinity.services.billing', [])
        .service('BillingService', BillingService);

    BillingService.$inject = ['$resource', 'env', '$http'];
    function BillingService($resource, env, $http) {
        this.api = api;
        this.getMileage = getMileage;
        this.endpoint = env.getEndpoint();
        var url = this.endpoint + '/:type/billing/:param/:param2/:param3';
        
        ////////////////
        
        function api() {
            return $resource(url, {}, {
                getWeeks: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }, 
                    params: {
                        type: 'shared',
                        param: 'weeks'
                    },
                    withCredentials: true,
                    isArray: true
                },
                getWeeklyInspections: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'shared'
                    },
                    withCredentials: true
                },
                getInspectionsByInspector: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'shared'
                    },
                    withCredentials: true
                },
                lock: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        param: 'lock'
                    },
                    withCredentials: true
                },
                getMileage: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'shared',
                        param: 'mileage'
                    },
                    transformRequest: [],
                    withCredentials: true
                },
                saveMileage: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'shared',
                        param: 'mileage',
                        param2: 'save'
                    },
                    withCredentials: true
                },
                getInspectorLock: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'shared',
                        param: 'check-lock'
                    },
                    withCredentials: true
                }
            });
        }
        
        function getMileage(url) {
            return $http({
                method: 'GET',
                url: url,
                headers: {
                    'Accept': 'application/json'
                } 
            });
        }
    }
})();