(function() {
'use strict';

    angular
        .module('trinity.inspections.services.workorderLogger', [])
        .service('WorkorderLoggerService', WorkorderLoggerService);

    WorkorderLoggerService.$inject = ['$resource', 'env'];
    function WorkorderLoggerService($resource, env) {
        this.api = api;
        
        ////////////////

        function api() { 
            var pattern = '/:type/logger/:id';
            var url = env.getEndpoint() + pattern;
            return $resource(url, {}, {
                getLog: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        'type': 'admin'
                    },
                    withCredentials: true
                }
            });
        }
    }
})();