(function() {
	angular.module('trinity.inspections.controllers.form', [])

	.controller('formCtrl', ['$scope', 'form', 'shared', '$routeParams', 'InspectionService', 'STATUSES', 'FormService',
	function($scope, form, shared, $routeParams, InspectionService, STATUSES, FormService) {
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

			console.log($scope);

		}, function(err) {
			console.log(err);
		});

		if (form.inspection) {
			$scope.form = form.inspection[0];
		} else {
			$scope.form = form;
		}

		/**
		 * [function description]
		 * @return {[type]} [description]
		 */
		$scope.setBillingTypes = function() {
			$scope.inspectionOutcome = $scope.outcomes.outcomes.filter(function(item) {
				if ($scope.form.outcome_type) {
					return item.id === $scope.form.outcome_type;
				}
				return 1;
			})[0];

			$scope.harnessCharge = $scope.outcomes.harnessCharges.filter(function(item) {
				if ($scope.form.harness_charge) {
					return item.amount === $scope.form.harness_charge;
				}
				return {
					amount: 50
				};

			})[0];

			$scope.tarpCharge = $scope.outcomes.tarpCharges.filter(function(item) {
				if ($scope.form.tarp_charge) {
					return item.amount === $scope.form.tarp_charge;
				}
				return {
					amount: 75
				};
			})[0];
		};

		$scope.save = function() {
			var form = angular.copy($scope.form);
			form.work_order_id = $scope.workorder.id;

			FormService.save(form).$promise.then(function(data) {
				console.log(data);
			}, function(err) {
				console.log(err);
			});
		};

	}]);
}(angular));
