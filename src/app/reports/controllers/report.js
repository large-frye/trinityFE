(function() {
	angular.module('trinity.reports.controllers.report', [])

	.controller('reportCtrl', ['$scope', 'reportService', 'report',
		function($scope, reportService, report) {

			angular.element('.content-wrapper').removeClass('no-margin-left');

			$scope.options = [{
				parent: 'All Inspections',
				link: '/#/account/reports'
			}, {
				parent: 'All Open Inspections',
				link: '/#/account/reports/open'
			}, {
				parent: 'Attention Required',
				link: '/#/account/reports/attention-required'
			}, {
				parent: 'New Inspections',
				link: '/#/account/reports/new'
			}, {
				parent: 'New Pickups',
				link: '/#/account/reports/new-pickups'
			}, {
				parent: 'In Process/Reschedule',
				link: '/#/account/reports/process-reschedule'
			}, {
				parent: 'On Hold',
				link: '/#/account/reports/on-hold'
			}, {
				parent: 'Scheduled',
				link: '/#/account/reports/scheduled'
			}, {
				parent: 'Insp Input Required',
				link: '/#/account/reports/insp-input-req'
			}, {
				parent: 'Post Inspection Date',
				link: '/#/account/reports/post-inspection-date'
			}, {
				parent: 'Inspected',
				link: '/#/account/reports/inspected'
			}, {
				parent: 'Invoiced',
				link: '/#/account/reports/invoiced'
			}, {
				parent: 'Invoiced Past 30 Days',
				link: '/#/account/reports/invoiced-past-30-days'
			}, {
				parent: 'Invoiced Past 60 Days',
				link: '/#/account/reports/invoiced-past-60-days'
			}, {
				parent: 'Invoiced Past 90 Days',
				link: '/#/account/reports/invoiced-past-90-days'
			}, {
				parent: 'Closed',
				link: '/#/account/reports/closed'
			}, {
				parent: 'Cancelled',
				link: '/#/account/reports/cancelled'
			}, {
				parent: 'Cancelled Closed',
				link: '/#/account/reports/cancelled-closed'
			}, {
				parent: 'Today\'s Inspections',
				link: '/#/account/reports/today'
			}, {
				parent: 'Tomorrow\'s Inspections',
				link: '/#/account/reports/tomorrow'
			}, {
				parent: 'Yesterday\'s Inspections',
				link: '/#/account/reports/yesterday'
			}, {
				parent: 'This Week\'s Inspections',
				link: '/#/account/reports/this-week'
			}, {
				parent: 'Next Week\'s Inspections',
				link: '/#/account/reports/next-week'
			}, {
				parent: 'Last Week\'s Inspections',
				link: '/#/account/reports/last-week'
			}, {
				parent: 'This Month\'s Inspections',
				link: '/#/account/reports/this-month'
			}, {
				parent: 'Next Month\'s Inspections',
				link: '/#/account/reports/next-month'
			}, {
				parent: 'Last Month\'s Inspections',
				link: '/#/account/reports/last-month'
			}, {
				parent: 'This Years\'s Inspections',
				link: '/#/account/reports/this-year'
			}, {
				parent: 'Last Year\'s Inspections',
				link: '/#/account/reports/last-year'
			}];
		}
	]);

}());
