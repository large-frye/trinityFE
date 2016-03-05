/**
 * Created by andrewfrye on 1/19/16.
 */
(function() {
    'use strict';

    angular.module('trinity.account.services', [])

        .service('accountService', ['$resource', function($resource) {
            return $resource('http://api.trinity.dev/:action/:sub/:id/:id2', {
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
                }
            });
        }])

        .service('accountInfo', [ function() {
            return {
                token: null
            };
        }]);
})();
