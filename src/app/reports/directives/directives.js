(function() {
	angular.module('trinity.reports.directives', [])

	.directive('reportData', [ function() {
		return {
			restrict: 'E',
			scope: {
				report: '=',
				fields: '='
			},
			link: function($scope) {
				console.log($scope);
			},
			templateUrl: 'src/app/reports/partials/report-data.html'
		}
	}])
}());
