/* global angular */

(function () {
	'use strict';
	angular
		.module('trinity.controllers.admin.processing', [])
		.controller('adminProcessingCtrl', AdminProcessingController);

	AdminProcessingController.$inject = ['shared', '$routeParams', 'InspectionService',
		'UserService', 'inspection', '$log', 'alert', 'UserFactory', 'FORM', 'INSPECTION_OUTCOMES', '$rootScope', '$modal', 'FileService'];
	function AdminProcessingController(shared, $routeParams, InspectionService, UserService,
		inspection, $log, alert, UserFactory, FORM, INSPECTION_OUTCOMES, $rootScope, $modal, FileService) {
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
		vm.calendarDetails = 'Test';
		vm.uploadFile = uploadFile;
		vm.upload = upload;
		vm.showAlertModal = showAlertModal;
		vm.lockWorkorder = lockWorkorder;

		activate();

		////////////////

		function activate() {
			getInspectors();
			getStatuses();
			setDates();
			getInspectionType();
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
			inspection.date_invoiced = new Date(inspection.date_invoiced).getTime();
			inspection.due_date = new Date(inspection.due_date).getTime();
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

		function getInspectionType() {
			for (var key in INSPECTION_OUTCOMES) {
				var outcome = INSPECTION_OUTCOMES[key];
				if (outcome === vm.inspection.inspection_outcome)
					vm.inspectionOutcomeToString = getInspectionOutcomeName(key);
			}
		}

		function getInspectionOutcomeName(key) {
			var ret = key
				.replace(/_/g, ' ')
				.replace('WITH', 'w/')
				.toLowerCase();

			for (var i = 0; i < ret.length; i++) {
				var char = ret[i];

				if (i === 0)
					ret = ret.substring(0, 1).toUpperCase() + ret.substring(1, ret.length);

				if (char === ' ')
					ret = ret.substring(0, i) + char + ret.substr(i + 1, 1).toUpperCase() + ret.substring(i + 2);
					
			}

			return ret;
		}

		function uploadFile() {
			var $file = angular.element('input[type="file"]');
            var fileChooser = $file[0];
            var files = fileChooser.files;
            var formData = new FormData();
            var inc = 0;
			var user =  UserFactory.user.get();

            for (var key in files) {
                if (files.hasOwnProperty(key)) {
                    formData.append('file_' + inc, files[key]);
                }
                inc++;
            }

            formData.append('workorderId', vm.inspection.id);
			formData.append('files3Name', vm.uploadType.toLowerCase() + '_' + vm.inspection.claim_num + '_' + vm.inspection.last_name);
			formData.append('username', user.profile.first_name + ' ' + user.profile.last_name);
			formData.append('uploadType', vm.uploadType);
            
            vm.loading = true;
            FileService.api().upload(formData).$promise.then(function(data) {
                vm.loading = false;
				vm.reloadNotes = true;
				$file.replaceWith($file.val('').clone(true));
            }, function (err) {
				$file.replaceWith($file.val('').clone(true));
                $log.log(err);
            }); 
		}

		function upload(uploadType) {
			vm.uploadType = uploadType;
            var $file = angular.element('input[type="file"]');
            $file.click();
		}

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
                            vm.inspection = data.workorder;
							vm.reloadNotes = true;
                        };
                    }
                },
                show: false
            });
            modal.$promise.then(modal.show);
        }

		function lockWorkorder() {
			return InspectionService.lockWorkorder({
				id: vm.inspection.id
			}, function(data) {
				vm.inspection = data.workorder;
			}, function(err) {
				$log.log(err);
			});
		}
	}
})();
