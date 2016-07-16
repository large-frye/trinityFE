/* global angular */

(function () {
    'use strict';

    angular.module('trinity.inspections.services', ['ngResource'])

        .service('InspectionService', ['$resource', 'env', function ($resource, env) {

            var pattern = '/:type/:route/:action/:id';
            var url = env.getEndpoint() + pattern;

            return $resource(url, {}, {
                create: {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'workorder',
                        action: 'save'
                    },
                    withCredentials: true
                },
                get: {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'workorder'
                    },
                    withCredentials: true
                },
                getStatuses: {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'workorder',
                        action: 'statuses'
                    },
                    withCredentials: true
                },
                inspectionForm: {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'inspections'
                    },
                    withCredentials: true
                },
                inspectionOutcomes: {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'inspections',
                        action: 'outcomes'
                    },
                    withCredentials: true
                },
                getInspectionTypes: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'inspections',
                        action: 'types'
                    },
                    withCredentials: true
                },
                lockWorkorder: {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'workorder',
                        action: 'inspector-lock'
                    },
                    withCredentials: true
                }
            });
        }])

        .service('FormService', ['$resource', 'env', function ($resource, env) {
            
            var pattern = '/:type/:route/:action/:id';
            var url = env.getEndpoint() + pattern;
            
            return $resource(url, {}, {
                get: {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'form',
                        action: 'get'
                    },
                    withCredentials: true
                },
                save: {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json'
                    },
                    params: {
                        type: 'admin',
                        route: 'form',
                        action: 'save'
                    },
                    withCredentials: true
                },
                upload: {
                    method: 'POST',
                    params: {
                        type: 'admin',
                        route: 'form',
                        action: 'upload'
                    },
                    headers: {
                        'Content-Type': undefined
                    },
                    withCredentials: true
                }
            });
        }])

        .service('inspectorInspectionService', ['$resource', 'env', function ($resource, env) {
            var pattern = '/inspector/inspections/:id/:userId';
            var url = env.getEndpoint() + pattern;
            return $resource(url, {}, {
                get: {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json'
                    },
                    withCredentials: true
                }
            });
        }])

        .factory('InspectionFactory', [function () {
            return {
                roofConditions: ['Blisters', 'Nail pops', 'Significant granule loss',
                    'Cupped/Curled shingles', 'Flashing not sealed', 'Debris on roof/clogged gutters',
                    'Roof decking rotted/Poor conditions']
            };
        }]);
}());
