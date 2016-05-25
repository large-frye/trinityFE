/* global angular */

(function() {
	'use strict';
	angular
		.module('trinity.controllers.admin.processing', [])
		.controller('adminProcessingCtrl', AdminProcessingController);

	AdminProcessingController.$inject = ['shared', '$routeParams', 'InspectionService',
	'UserService', 'inspection', '$log', 'alert'];
	function AdminProcessingController(shared, $routeParams, InspectionService, UserService,
	inspection, $log, alert) {
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
		vm.setTime = setTime;

		activate();

		////////////////

		function activate() {
			getInspectors();
			getStatuses();
			setTime();
			setDates();
		}
		
		function getStatuses() {
			return InspectionService.getStatuses().$promise.then(
				function(data) {
					vm.statuses = data.statuses;
					vm.status = vm.statuses.filter(function(item) {
						return vm.inspection.status_id === item.id;
					})[0];
				}, function(err) {
				$log.err(err);
			});
		}
		
		function getInspectors() {
			UserService.inspectors().$promise.then(function(data) {
				vm.inspectors = data.inspectors;
				vm.inspector = vm.inspectors.filter(function(item) {
					return vm.inspection.inspector_id === item.id;
				})[0];
			}, function(err) {
				$log.err(err);
			});
		}
		
		function setStatus(status) { vm.inspection.status_id = status.id; }
		
		function setInspector(inspector) { vm.inspection.inspector_id = inspector.id; }
		
		function save() {
			var inspection = angular.copy(vm.inspection);
			inspection.date_of_inspection = new Date(inspection.date_of_inspection).getTime();
			inspection.status_id = vm.status.id;
			delete inspection.inspection_val;

			InspectionService.create(inspection).$promise.then(function(data) {
				vm.alerts = alert.add({
					title: 'Saved',
					content: 'Saved',
					type: 'success'
				}, 3000);
			}, function(err) {
				$log.err(err);
			});
		}
		
		function setTime() {
			var time = new Date(vm.inspection.date_of_inspection);
			vm.time = time.getTime();
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
