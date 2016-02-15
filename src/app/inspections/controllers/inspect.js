(function (angular) {
	angular.module('trinity.inspections.controllers.inspect', [])

	.controller('inspectionsCtrl', ['$scope', 'UserService', 'InspectionService', '$modal', '$routeParams',
	'inspection', 'location',
		function ($scope, UserService, InspectionService, $modal, $routeParams,
		inspection, location) {

			var setInspectionType = function() {
				$scope.inspection.inspection_type = $scope.inspectionTypes.filter(function(type) {
					return type.id === $scope.inspection.inspection_type;
				})[0];
			};

			var setStringToDate = function(data) {
				data.date_received = new Date(data.date_received);
				data.date_of_inspection = new Date(data.date_of_inspection);
				data.date_of_loss = new Date(data.date_of_loss);
			};

			var setAdjuster = function() {
				$scope.inspection.adjuster = $scope.adjusters.filter(function(adjuster) {
					return adjuster.id === $scope.inspection.adjuster.id;
				})[0];
			}

			// Inspection Types
			$scope.inspectionTypes = [{
				id: 0,
				name: 'Basic'
			}, {
				id: 1,
				name: 'Expert'
			}, {
				id: 2,
				name: 'Ladder Assist'
			}];

			// Adjusters dropdown
			UserService.adjusters(function(data) {
				$scope.adjusters = data.adjusters;

				// Set adjusters
				if ($routeParams.id) {
					setAdjuster();
				}

				// Set inspection id
			}, function(err) {
				window.console && console.log(err);
			});

			$scope.inspection = inspection.order;

			if ($routeParams.id) {
				angular.element('.content-wrapper').removeClass('no-margin-left');

				$scope.options = [{
					parent: 'Work Order Details',
					link: '/#/account/workorders/' + $scope.inspection.id
				}, {
					parent: 'Processing Order Details',
					link: '/#/account/processing/' + $scope.inspection.id
				}, {
					parent: 'Inspection Details',
					link: '/#/account/inspection/' + $scope.inspection.id
				}, {
					parent: 'Inspection Photos',
					link: '/#/account/inspection/photos/' + $scope.inspection.id
				}, {
					parent: 'Generate Report',
					link: '/#/account/generate/' + $scope.inspection.id
				}, {
					parent: 'Invoice Details',
					link: '/#/account/invoice/' + $scope.inspection.id
				}];

				setInspectionType();

			} else {
				// Hide the side bar
				angular.element('.content-wrapper').addClass('no-margin-left');
			}

			$scope.save = function() {
				// Angular will use the object and we only need the id
				var inspection = angular.copy($scope.inspection);
				inspection.inspection_type = inspection.inspection_type.id;

				InspectionService.create(inspection).$promise.then(function(data) {

					if (!$scope.inspection.id) {
						location.skipReload().path('/account/inspections/' + data.id);
					}

					setStringToDate(data);
					$scope.inspection = data;

					// Set form details
					setInspectionType();
					setAdjuster();

				}, function(err) {
					console.log(err);
				})
			}

			$scope.showModal = function() {
				var modal = $modal({
					scope: $scope,
					title: 'title',
					content: 'content',
					show: true,
					animation: 'am-fade-and-scale',
					templateUrl: 'src/app/inspections/partials/create-client-modal.html'
				});
			}
		}
	])

	.controller('modalCtrl', ['$scope', function($scope) {
		$scope.title = 'andrew';
	}]);

}(angular));
