/**
* Created by andrewfrye on 1/19/16.
*/
(function() {
	'use strict';

	angular.module('trinity.user.Services', [])

	.service('UserService', ['$resource', function($resource) {
		return $resource('http://api.trinity.dev/:action/:sub/:id/:id2', {
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
				}
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
				}
			}
		});
	}]);
})();
