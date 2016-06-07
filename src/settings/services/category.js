(function () {
    'use strict';

    angular
        .module('trinity.settings.services.category', ['ngResource'])
        .service('CategoryService', CategoryService);

    CategoryService.$inject = ['$resource', 'env'];
    function CategoryService($resource, env) {
        this.api = api;

        ////////////////

        function api() {
            var pattern = '/:type/settings/:action/:route/:id';
            var url = env.getEndpoint() + pattern;

            return $resource(url, {}, {
                getParentCategories: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        action: 'categories',
                        route: 'parents'
                    },
                    withCredentials: true
                },
                saveCategory: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        action: 'categories',
                        route: 'save-category'
                    },
                    withCredentials: true
                },
                createExcel: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/vnd.ms-excel',
                        'Content-Type': 'application/vnd.ms-excel'
                    },
                    params: {
                        type: 'admin',
                        action: 'categories',
                        route: 'create-excel'
                    },
                    withCredentials: true
                },
                deleteCategory: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        action: 'categories',
                        route: 'delete'
                    },
                    withCredentials: true
                }
            });
        }
    }
})();