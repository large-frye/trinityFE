(function() {
	angular.module('trinity.reports.controllers.report', [])

	.controller('reportCtrl', ['$scope', 'reportService', 'report', '$location', 'shared',
		function($scope, reportService, report, $location, shared) {

			$scope.report = report;

			angular.element('.content-wrapper').removeClass('no-margin-left');

			$scope.options = shared.getReportSideBar();

			$scope.findInspection = function(id) {
				$location.url(encodeURIComponent('/admin/inspections/' + id));
			};
		}
	]);

}());
