(function() {
	angular.module('trinity.inspections.controllers.form', [])

	.controller('formCtrl', ['$scope', 'form', 'shared', '$routeParams', 'InspectionService', 'STATUSES', 'FormService', 'InspectionFactory', '$modal', '$rootScope',
		function($scope, form, shared, $routeParams, InspectionService, STATUSES, FormService, InspectionFactory, $modal, $rootScope) {
		$scope.options = shared.getInspectionSideBar($routeParams.id);

		// Get outcomes
		InspectionService.inspectionOutcomes(function(data) {
			$scope.outcomes = data;
			$scope.setBillingTypes();
		}, function(err) {
			console.log(err);
		});

		// Get work order data
		InspectionService.get({
			id: $routeParams.id
		}).$promise.then(function(data) {
			data.order.date_received = new Date(data.order.date_received);
			data.order.date_of_inspection = new Date(data.order.date_of_inspection);
			data.order.date_of_loss = new Date(data.order.date_of_loss);
			data.order.date_of_last_contact = new Date(data.order.date_of_last_contact);
			$scope.workorder = data.order;

			$scope.workorderStatus = STATUSES.filter(function(item) {
				return item.id === $scope.workorder.status_id;
			})[0];

		}, function(err) {
			console.log(err);
		});

		if (form.inspection) {
			$scope.form = {};
			var inspectionItems = form.inspection;
			inspectionItems.forEach(function(item) {
				$scope.form[item.key] = item.value;
			});

			if ($scope.form.roof_conditions) {
				$scope.form.roof_conditions = angular.fromJson($scope.form.roof_conditions);
			}
		} else {
			$scope.form = form;
		}

		// Set our roof conditions
		$scope.listRoofConditions = InspectionFactory.roofConditions;

		/**
		 * [function description]
		 * @return {[type]} [description]
		 */
		$scope.setBillingTypes = function() {
			$scope.inspectionOutcome = $scope.outcomes.outcomes.filter(function(item) {
				if ($scope.form.outcome_type) {
					return item.name === $scope.form.outcome_type;
				}
			})[0];

			$scope.harnessCharge = $scope.outcomes.harnessCharges.filter(function(item) {
				if ($scope.form.harness_charge) {
					return item.amount === parseInt($scope.form.harness_charge, 10);
				}
			})[0];

			$scope.tarpCharge = $scope.outcomes.tarpCharges.filter(function(item) {
				if ($scope.form.tarp_charge) {
					return item.amount === parseInt($scope.form.tarp_charge, 10);
				}
			})[0];
		};

		$scope.addCondition = function(condition, add) {
			$scope.form.roof_conditions = $scope.form.roof_conditions || [];
			if (add) {
				$scope.form.roof_conditions.push(condition);
			} else {
				var index = $scope.form.roof_conditions.indexOf(condition);
				$scope.form.roof_conditions.splice(index, 1);
			}
		};

		$scope.conditionExists = function(condition) {
			return $scope.form.roof_conditions.indexOf(condition) !== -1;
		};

		$scope.save = function() {
			var form = angular.copy($scope.form);
			form.workorder_id = $scope.workorder.id;

			FormService.save(form).$promise.then(function(data) {
				console.log(data);
			}, function(err) {
				console.log(err);
			});
		};

		$scope.initUpload = function($event, type) {
			if (!$scope.form[type]) {
				$scope.upload(type);
			} else {
				$scope.showModal(type);
			}

			$event.preventDefault();
		};

		$scope.upload = function(type, cb) {
			var $file = angular.element('input[type="file"]');
			$scope.fileType = type;
			$file.click();
			if (cb) cb();
		};

		$scope.showModal = function(type) {
			var scope = $rootScope.$new();
			scope.url = $scope.form[type];
			scope.name = type;
			scope.upload = function(type) {
				$scope.upload(type, function() {
					modal.hide();
				});
			};

			var modal = modal || $modal({
				scope: scope,
				templateUrl: 'src/partials/modals/file-upload-confirmation.html',
				show: false
			});
			modal.$promise.then(modal.show);
		};

		$scope.uploadFile = function() {
			var $file = angular.element('input[type=file]');
			var fileChooser = $file[0];
			var reader = new FileReader();
			var file = fileChooser.files[0];
			var formData = new FormData();

			formData.append('file', file);
			formData.append('workorder_id', $scope.workorder.id);
			formData.append('key', $scope.fileType);

			FormService.upload(formData).$promise.then(function(data) {
				$scope.form[$scope.fileType] = data.url;
			}, function(err) {
				console.log(err);
			});
		};

	}]);
}(angular));
