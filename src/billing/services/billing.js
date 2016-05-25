(function() {
'use strict';

    angular
        .module('trinity.services.billing', [])
        .service('BillingService', BillingService);

    BillingService.$inject = ['$resource', 'env'];
    function BillingService($resource, env) {
        this.api = api;
        
        ////////////////

        var endpoint = env.getEndpoint();
        var url = endpoint + '/:type/billing/:param/:param2/:param3';
        
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
                }
            });
        }
    }
})();