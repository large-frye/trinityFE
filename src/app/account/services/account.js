/**
 * Created by andrewfrye on 1/19/16.
 */
(function() {
    'use strict';

    angular.module('trinity.account.accountService', [])

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
                        action: 'account',
                        sub: 'workorders',
                        id: 'counts'
                    }
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
                    isArray: true
                },
                'workOrders': {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        action: 'account',
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
                        action: 'account',
                        sub: 'workorder'
                    },
                    isArray: true
                }
            })
        }])

        .service('accountInfo', [ function() {
            return {
                token: null
            };
        }]);
})();
