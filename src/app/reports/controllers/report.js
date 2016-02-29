(function() {
	angular.module('trinity.reports.controllers.report', [])

	.controller('reportCtrl', ['$scope', 'reportService', 'report', '$location',
		function($scope, reportService, report, $location) {

			$scope.report = report;

			angular.element('.content-wrapper').removeClass('no-margin-left');

			$scope.options = [{
				parent: 'All Inspections',
				link: '/#/admin/reports'
			}, {
				parent: 'All Open Inspections',
				link: '/#/admin/reports/open'
			}, {
				parent: 'Attention Required',
				link: '/#/admin/reports/attention-required'
			}, {
				parent: 'Inspector Attention Required',
				link: '/#/admin/reports/inspector-attention-required'
			}, {
				parent: 'New Inspections',
				link: '/#/admin/reports/new'
			}, {
				parent: 'New Pickups',
				link: '/#/admin/reports/new-pickups'
			}, {
				parent: 'In Process/Reschedule',
				link: '/#/admin/reports/process-reschedule'
			}, {
				parent: 'On Hold',
				link: '/#/admin/reports/on-hold'
			}, {
				parent: 'Scheduled',
				link: '/#/admin/reports/scheduled'
			}, {
				parent: 'Insp Input Required',
				link: '/#/admin/reports/insp-input-req'
			}, {
				parent: 'Post Inspection Date',
				link: '/#/admin/reports/post-inspection-date'
			}, {
				parent: 'Inspected',
				link: '/#/admin/reports/inspected'
			}, {
				parent: 'Invoiced',
				link: '/#/admin/reports/invoiced'
			}, {
				parent: 'Invoiced Past 30 Days',
				link: '/#/admin/reports/invoiced-past-30-days'
			}, {
				parent: 'Invoiced Past 60 Days',
				link: '/#/admin/reports/invoiced-past-60-days'
			}, {
				parent: 'Invoiced Past 90 Days',
				link: '/#/admin/reports/invoiced-past-90-days'
			}, {
				parent: 'Closed',
				link: '/#/admin/reports/closed'
			}, {
				parent: 'Cancelled',
				link: '/#/admin/reports/cancelled'
			}, {
				parent: 'Cancelled Closed',
				link: '/#/admin/reports/cancelled-closed'
			}, {
				parent: 'Today\'s Inspections',
				link: '/#/admin/reports/today'
			}, {
				parent: 'Tomorrow\'s Inspections',
				link: '/#/admin/reports/tomorrow'
			}, {
				parent: 'Yesterday\'s Inspections',
				link: '/#/admin/reports/yesterday'
			}, {
				parent: 'This Week\'s Inspections',
				link: '/#/admin/reports/this-week'
			}, {
				parent: 'Next Week\'s Inspections',
				link: '/#/admin/reports/next-week'
			}, {
				parent: 'Last Week\'s Inspections',
				link: '/#/admin/reports/last-week'
			}, {
				parent: 'This Month\'s Inspections',
				link: '/#/admin/reports/this-month'
			}, {
				parent: 'Next Month\'s Inspections',
				link: '/#/admin/reports/next-month'
			}, {
				parent: 'Last Month\'s Inspections',
				link: '/#/admin/reports/last-month'
			}, {
				parent: 'This Years\'s Inspections',
				link: '/#/admin/reports/this-year'
			}, {
				parent: 'Last Year\'s Inspections',
				link: '/#/admin/reports/last-year'
			}];

			$scope.findInspection = function(id) {
				$location.url(encodeURIComponent('/admin/inspections/' + id));
			};
		}
	]);

}());
