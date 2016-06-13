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
            var endpoint = env.getEndpoint() + '/:type/:route/:action/:workorderId/:parentCategory/:parentId/:subParentId/:labelName';
            return $resource(endpoint, {}, {
                getPhotos: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {},
                    withCredentials: true
                },  
                getLabeledPhotos: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'photos'
                    },
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
                saveCategories: {
                    method: 'POST',
                    params: {
                        type: 'admin',
                        route: 'settings',
                        action: 'categories',
                        workorderId: 'save' // should rename url structure
                    },
                    headers: {
                        'Accept': 'application/json'
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
                getMicroCategories: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'photos',
                        action: 'micro-categories'
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
                },
                save: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'photos',
                        action: 'save'
                    },
                    withCredentials: true
                },
                delete: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'photos',
                        action: 'delete'
                    },
                    withCredentials: true
                }
            });
        }
    }
})();