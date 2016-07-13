(function () {
    'use strict';

    angular
        .module('trinity.resources.services.resource', [])
        .service('ResourceService', ResourceService);

    ResourceService.$inject = ['$resource', 'env'];
    function ResourceService($resource, env) {
        this.api = api;

        var pattern = '/:type/resources/:action/:sub/:sub2';
        var url = env.getEndpoint() + pattern;

        ////////////////

        function api() {
            return $resource(url, {}, {
                'getResources': {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'shared'
                    },
                    withCredentials: true
                },
                'saveResource': {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        action: 'save'
                    },
                    withCredentials: true
                },
                'uploadResource': {
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined
                    },
                    params: {
                        type: 'admin',
                        action: 'upload'
                    },
                    withCredentials: true
                },
                'deleteResource': {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        action: 'delete'
                    },
                    withCredentials: true
                }
            });
        }
    }
})();