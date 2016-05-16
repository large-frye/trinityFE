/**
* Created by andrewfrye on 1/19/16.
*/
(function() {
	'use strict';

	angular.module('trinity.user.services', [])

	.service('UserService', ['$resource', 'env', function($resource, env) {

		var pattern = '/:action/:sub/:id/:id2';
		var url = env.getEndpoint() + pattern;

		return $resource(url, {
			action: '@action'
		}, {
			'adjusters': {
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				},
				params: {
					action: 'shared',
					sub: 'users',
					id: 4
				},
				withCredentials: true
			},
			inspectors: {
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				},
				params: {
					action: 'shared',
					sub: 'users',
					id: 'inspectors'
				},
				withCredentials: true
			},
			destroy: {
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				},
				params: {
					action: 'auth',
					sub: 'logout'
				},
				withCredentials: true
			}
		});
	}]);
})();
