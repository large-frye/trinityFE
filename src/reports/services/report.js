(function() {
	angular.module('trinity.reports.services.report', ['ngResource'])

	.service('reportService', ['$resource', function($resource) {
		return $resource('http://api.trinity.dev/admin/reports/:action/:sub/:sub2', {

		}, {
			get: {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				params: {
					action: 'get'
				},
				withCredentials: true
			},
			byStatus: {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				params: {
					action: 'by-status'
				},
				withCredentials: true
			}
		});
	}]);
}());
