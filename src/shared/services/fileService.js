(function() {
'use strict';

    angular
        .module('trinity.shared.services.fileService', [])
        .service('FileService', FileService);

    FileService.$inject = ['$resource', 'env'];
    function FileService($resource, env) {
        this.api = api;

        var url = env.getEndpoint() + '/shared/files/:action/:id';
        
        ////////////////

        function api() {
            return $resource(url, { /* noop */}, {
                upload: {
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined
                    },
                    params: {
                        action: 'upload'
                    },
                    withCredentials: true
                },
                getFiles: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {},
                    withCredentials: true
                }
            });
        }
    }
})();