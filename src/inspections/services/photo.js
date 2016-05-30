(function() {
'use strict';

    angular
        .module('trinity.inspections.services.photo', [])
        .service('PhotoService', PhotoService);

    PhotoService.$inject = ['$resource', 'env'];
    function PhotoService($resource, env) {
        this.api = api;
        
        ////////////////

        function api() { 
            var endpoint = env.getEndpoint() + '/:type/:route/:action/:workorderId/:parentCategory';
            return $resource(endpoint, {}, {
                getPhotos: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {},
                    withCredentials: true
                },  
                upload: {
                    method: 'POST',
                    params: {
                        type: 'admin',
                        route: 'photos'
                    },
                    headers: {
                        'Content-Type': undefined
                    },
                    withCredentials: true
                },
                getParentCategories: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'photos',
                        action: 'parent-categories'
                    },
                    withCredentials: true
                },
                getSubCategories: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'photos',
                        action: 'sub-categories'
                    },
                    withCredentials: true
                },
                getPhotosByCategory: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'photos',
                        action: 'parent'
                    },
                    withCredentials: true
                }
            });
        }
    }
})();