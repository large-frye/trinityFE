/* global angular */

(function () {
	'use strict';
	angular
		.module('trinity.controllers.admin.processing', [])
		.controller('adminProcessingCtrl', AdminProcessingController);

	AdminProcessingController.$inject = ['shared', '$routeParams', 'InspectionService',
		'UserService', 'inspection', '$log', 'alert', 'UserFactory', 'FORM'];
	function AdminProcessingController(shared, $routeParams, InspectionService, UserService,
		inspection, $log, alert, UserFactory, FORM) {
		var vm = this;
		vm.options = shared.getInspectionSideBar($routeParams.id);
		vm.inspection = inspection.order;
		vm.auto_upgrade = vm.inspection.auto_upgrade ? 'Yes' : 'No';

		//// functions
		vm.getStatuses = getStatuses;
		vm.getInspectors = getInspectors;
		vm.setStatus = setStatus;
		vm.setInspector = setInspector;
		vm.save = save;

		activate();

		////////////////

		function activate() {
			getInspectors();
			getStatuses();
			setDates();
		}

		function getStatuses() {
			return InspectionService.getStatuses().$promise.then(
				function (data) {
					vm.statuses = data.statuses;
					vm.status = vm.statuses.filter(function (item) {
						return vm.inspection.status_id === item.id;
					})[0];
				}, function (err) {
					$log.err(err);
				});
		}

		function getInspectors() {
			UserService.inspectors().$promise.then(function (data) {
				vm.inspectors = data.inspectors;
				vm.inspector = vm.inspectors.filter(function (item) {
					return vm.inspection.inspector_id === item.id;
				})[0];
			}, function (err) {
				$log.err(err);
			});
		}

		function setStatus(status) { vm.inspection.status_id = status.id; }

		function setInspector(inspector) { vm.inspection.inspector_id = inspector.id; }

		function save() {
			var inspection = angular.copy(vm.inspection);
			inspection.date_of_last_contact = new Date(inspection.date_of_last_contact).getTime();
			inspection.date_cancelled = new Date(inspection.date_cancelled).getTime();
			inspection.status_id = vm.status.id;

			// Add updated by for Logger service
			inspection.updated_by = UserFactory.user.get().id;

			function getDate() {
				inspection.date_of_inspection = new Date(inspection.date_of_inspection);
				return getMonth() + '/' + getDay() + '/' + inspection.date_of_inspection.getFullYear();
			}

			function getMonth() {
				var month = inspection.date_of_inspection.getMonth() + 1;
				return month > 9 ? month.toString() : '0' + month;
			}

			function getDay() {
				var day = inspection.date_of_inspection.getDate();
				return day > 9 ? day.toString() : '0' + day;
			}

			inspection.date_of_inspection = new Date(getDate() + ' ' + vm.time).getTime();
		
			delete inspection.inspection_val;

			InspectionService.create(inspection).$promise.then(function (data) {
				vm.alerts = alert.add({
					title: 'Saved',
					content: 'Saved',
					type: 'success'
				}, FORM.SAVE_LENGTH);
			}, function (err) {
				vm.alerts = alert.add({
					title: 'Error',
					content: 'Error saving',
					type: 'danger'
				});
				$log.error(err);
			});
		}

		function setDates() {
			vm.inspection = vm.inspection || inspection.order;
			if (vm.inspection) {
				vm.inspection.date_of_inspection = new Date(vm.inspection.date_of_inspection);
			} else {
				inspection.order.date_of_inspection = new Date(inspection.order.date_of_inspection);
			}
			setLastContact();
		}

		function setLastContact() {
			vm.inspection.date_of_last_contact = vm.inspection.date_of_last_contact || new Date();
		}
	}
})();
