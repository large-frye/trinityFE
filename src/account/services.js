/**
 * Created by andrewfrye on 1/19/16.
 */
(function() {
    'use strict';

    angular.module('trinity.account.services', [])

        .service('accountService', ['$resource', 'env', function($resource, env) {
            var pattern = '/:action/:sub/:id/:id2';
            var url = env.getEndpoint() + pattern;
            return $resource(url, {
                action: '@action'
            }, {
                'signIn': {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        action: 'admin',
                        sub: 'workorders',
                        id: 'counts'
                    },
                    withCredentials: true
                },
                'authenticate': {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        action: 'auth',
                        sub: 'login'
                    },
                    withCredentials: true,
                    isArray: true
                },
                'workOrders': {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        action: 'admin',
                        sub: 'workorders',
                        id: 5
                    }
                },
                'workorder': {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        action: 'admin',
                        sub: 'workorder'
                    },
                    isArray: true
                },
                updateProfile: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        action: 'shared',
                        sub: 'profile',
                        id: 'save'
                    },
                    withCredentials: true
                },
                updatePassword: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        action: 'shared',
                        sub: 'password',
                        id: 'save'
                    },
                    withCredentials: true
                }
            });
        }])

        .service('accountInfo', [ function() {
            return {
                token: null
            };
        }]);
})();