(function() {
'use strict';

    angular
        .module('trinity.services.invoice', [])
        .service('InvoiceService', InvoiceService);

    InvoiceService.$inject = ['$resource', 'env'];
    function InvoiceService($resource, env) {
        this.api = api;
        
        ////////////////

        var endpoint = env.getEndpoint();
        var url = endpoint + '/shared/invoice/:param/:param2/:param3';
        
        function api() {
            return $resource(url, {}, {
                getWeeks: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }, 
                    params: {
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
                    withCredentials: true
                },
                getInspectionsByInspector: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    withCredentials: true
                }
            });
        }
    }
})();