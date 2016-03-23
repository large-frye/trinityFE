(function () {
	'use strict';

	angular.module('trinity.inspections.services', ['ngResource'])

	.service('InspectionService', ['$resource', function ($resource) {
		return $resource('http://api-dev.trinity.is:4444/admin/:route/:action/:id', {

		}, {
			create: {
				method: 'POST',
				headers: {
					Accept: 'application/json'
				},
				params: {
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
					route: 'inspections',
					action: 'outcomes'
				},
				withCredentials: true
			}
		});
	}])

	.service('FormService', ['$resource', function($resource) {
		return $resource('http://api-dev.trinity.is:4444/admin/:route/:action/:id', {

		}, {
			get: {
				method: 'GET',
				headers: {
					Accept: 'application/json'
				},
				params: {
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
					route: 'form',
					action: 'save'
				},
				withCredentials: true
			},
			upload: {
				method: 'POST',
				params: {
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

	.factory('InspectionFactory', [ function() {
		return {
			roofConditions: ['Blisters', 'Nail pops', 'Significant granule loss',
			'Cupped/Curled shingles', 'Flashing not sealed', 'Debris on roof/clogged gutters',
			'Roof decking rotted/Poor conditions']
		};
	}]);
}());
