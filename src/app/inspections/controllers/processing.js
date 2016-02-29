(function() {
	angular.module('trinity.inspections.controllers.processing', [])

	.controller('processingCtrl', ['$scope', 'inspection', '$routeParams',
		'InspectionService', 'shared', 'UserService', function($scope, inspection, $routeParams,
			InspectionService, shared, UserService) {
			$scope.options = shared.getInspectionSideBar($routeParams.id);

			$scope.inspection = inspection.order;
			$scope.auto_upgrade = $scope.inspection.auto_upgrade ? 'Yes' : 'No';

			InspectionService.getStatuses().$promise.then(
				function(data) {
					$scope.statuses = data.statuses;
					$scope.status = $scope.statuses.filter(function(item) {
						return $scope.inspection.status_id === item.id;
					})[0];
				}, function(err) {
					window.console && console.log(err);
				}
			);

			// Get inspectors
			UserService.inspectors().$promise.then(function(data) {
				$scope.inspectors = data.inspectors;
				$scope.inspector = $scope.inspectors.filter(function(item) {
					return $scope.inspection.inspector_id === item.id;
				})[0];
			}, function(err) {
				window.console && console.log(err);
			});

			$scope.setStatus = function(status) {
			    $scope.inspection.status_id = status.id;
			};

			$scope.setInspector = function(inspector) {
				$scope.inspection.inspector_id = inspector.id;
			};

			$scope.save = function() {

				// Create our save object and maintain $scope focus
				var inspection = angular.copy($scope.inspection);
				delete inspection.inspection_val;

				InspectionService.create(inspection).$promise.then(function(data) {
					console.log(data);
				}, function(err) {
					window.console && console.log(err);
				});
			};
		}
	]);
}());
