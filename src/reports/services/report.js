(function() {
	angular.module('trinity.reports.services.report', ['ngResource'])

	.service('reportService', ['$resource', 'env', function($resource, env) {

		var pattern = '/admin/reports/:action/:sub/:sub2';
		var url = env.getEndpoint() + pattern;

		return $resource(url, { }, {
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
			},
			excel: {
				method: 'GET',
				headers: {
					'Content-Type': 'application/csv',
					'Accept': 'application/csv'
				},
				params: {
					action: 'export-csv'
				},
				withCredentials: true
			}
		});
	}])

		.service('inspectorReportService', ['$resource', 'env', function($resource, env) {
			var pattern = '/inspector/reports/:action/:sub/:sub2';
			var url = env.getEndpoint() + pattern;

			return $resource(url, { }, {
				get: {
					method: 'GET',
					headers: {
						Accept: 'application/json'
					},
					withCredentials: true
				}
			});
		}]);
}());
