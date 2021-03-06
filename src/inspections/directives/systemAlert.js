(function() {
	'use strict';

	angular
		.module('trinity.inspections.directives.systemAlert', [])
		.directive(
			'systemAlert', SystemAlert);

	SystemAlert.$inject = ['$modal', '$rootScope'];

	function SystemAlert() {
		// Usage:
		//
		// Creates:
		//
		var directive = {
			bindToController: true,
			controller: ControllerController,
			controllerAs: 'vm',
			link: link,
			restrict: 'E',
			scope: {
				inspection: '=',
				reloadNotes: '=',
				customAlerts: '=',
				save: '='
			},
			templateUrl: 'src/partials/inspections/system-alert.html'
		};
		return directive;

		function link(scope, element, attrs) {}
	}
	/* @ngInject */
	function ControllerController($modal, $rootScope, $scope) {
		var vm = this;

		vm.showAlertModal = showAlertModal;
		vm.confirmAlert = confirmAlert;

		function showAlertModal() {
			var scope = $rootScope.$new();

			var modal = modal || $modal({
				scope: scope,
				templateUrl: 'src/partials/modals/alerts/alert.html',
				controller: 'alertModalCtrl',
				controllerAs: 'vm',
				resolve: {
					callbackAlertCompleted: function() {
						return function(data) {
							// Definitely not the best way to do this, but if setting the whole object it causes issues
							// with the adjuster.
							vm.inspection.alert_admin = data.workorder.alert_admin;
							vm.inspection.alert_office = data.workorder.alert_office;
							vm.inspection.alert_to_inspector = data.workorder.alert_to_inspector;
							vm.inspection.alert_from_inspector = data.workorder.alert_from_inspector;
							vm.reloadNotes = true;
							vm.save();
						};
					},
					customAlerts: function() {
						return vm.customAlerts;
					}
				},
				show: false
			});
			modal.$promise.then(modal.show);
		}

		function confirmAlert(alert, $event, alertType) {
			// Stop event from bubbling
			$event.stopPropagation();
			$event.preventDefault();

			var target = $event.target;
			var scope = $rootScope.$new();
			var modal = $modal({
				scope: scope,
				templateUrl: 'src/partials/modals/alerts/confirm-delete.html',
				controller: 'confirmAlertModalCtrl',
				controllerAs: 'vm',
				resolve: {
					confirmDelete: function() {
						return function() {
							alert = 0;
							target.checked = !target.checked;
							vm.save();
						};
					},
					denyDelete: function() {
						return function() {
							vm.inspection[alertType] = 1;
						};
					}
				},
				show: false
			});
			modal.$promise.then(modal.show);
		}
	}
})();
