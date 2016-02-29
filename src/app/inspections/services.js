(function () {
	'use strict';

	angular.module('trinity.inspections.services', ['ngResource'])

	.service('InspectionService', ['$resource', function ($resource) {
		return $resource('http://api.trinity.dev/admin/:route/:action/:id', {

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
			},
			getStatuses: {
				method: 'GET',
				headers: {
					Accept: 'application/json'
				},
				params: {
					route: 'workorder',
					action: 'statuses'
				}
			},
			inspectionForm: {
				method: 'GET',
				headers: {
					Accept: 'application/json'
				},
				params: {
					route: 'inspections'
				}
			},
			inspectionOutcomes: {
				method: 'GET',
				headers: {
					Accept: 'application/json'
				},
				params: {
					route: 'inspections',
					action: 'outcomes'
				}
			}
		});
	}])

	.service('FormService', ['$resource', function($resource) {
		return $resource('http://api.trinity.dev/admin/:route/:action/:id', {

		}, {
			get: {
				method: 'GET',
				headers: {
					Accept: 'application/json'
				},
				params: {
					route: 'form',
					action: 'get'
				}
			},
			save: {
				method: 'POST',
				headers: {
					Accept: 'application/json'
				},
				params: {
					route: 'form',
					action: 'save'
				}
			}
		});
	}])

	.factory('InspectionFactory', [ function() {
		return {
			roofConditions: ['Blisters', 'Nail pops', 'Significant granule loss',
			'Cupped/Curled shingles', 'Flashing not sealed', 'Debris on roof/clogged gutters',
			'Roof decking rotted/Poor conditions']
		};
	}]);
}());
