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
        var url = endpoint + '/shared/invoice/:id';
        
        function api() {
            return $resource(url, {}, {
                getWeeks: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }, 
                    params: {
                        id: 'weeks'
                    },
                    withCredentials: true,
                    isArray: true
                }
            });
        }
    }
})();