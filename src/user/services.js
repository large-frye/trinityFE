/**
* Created by andrewfrye on 1/19/16.
*/
(function() {
	'use strict';

	angular.module('trinity.user.services', [])

	.service('UserService', ['$resource', function($resource) {
		return $resource('http://api.trinity.is:4444/:action/:sub/:id/:id2', {
			action: '@action'
		}, {
			'adjusters': {
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				},
				params: {
					action: 'admin',
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
					action: 'admin',
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
