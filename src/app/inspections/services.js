(function () {
	'use strict';

	angular.module('trinity.inspections.services', ['ngResource'])

	.service('InspectionService', ['$resource', function ($resource) {
		return $resource('http://api.trinity.dev/account/:route/:action/:id', {

		}, {
			create: {
				method: 'POST',
				headers: {
					Accept: 'application/json'
				},
				params: {
					route: 'workorder',
					action: 'save'
				}
			},
			get: {
				method: 'GET',
				headers: {
					Accept: 'application/json'
				},
				params: {
					route: 'workorder'
				}
			}
		});
	}])
}());
