/* global angular */

(function (angular) {
	angular.module('trinity.inspections.controllers.inspect', [])

	.controller('inspectionsCtrl', ['$scope', 'UserService', 'InspectionService', '$modal', '$routeParams',
	'inspection', '$location', 'REPORTS', '$timeout', '$window', 'shared', 'UserFactory', 'alert', '$dateParser',
	'formFactory',
		function ($scope, UserService, InspectionService, $modal, $routeParams,
		inspection, $location, REPORTS, $timeout, $window, shared, UserFactory, alert, $dateParser, formFactory) {

			if (!$routeParams.id) $window.scrollTo(0, 0);
			
			$scope.inspection = inspection.order;
		
			/**
			 * [function description]
			 * @return {[type]} [description]
			 */
			var setInspectionType = function() {
				$scope.inspection.inspection_type = $scope.inspectionTypes.filter(function(type) {
					return type.id == $scope.inspection.inspection_type;
				})[0];
			};

			/**
			 * [function description]
			 * @param  {[type]} data [description]
			 * @return {[type]}      [description]
			 */
			var setStringToDate = function(data) {
				data.date_received = new Date(data.date_received);
				data.date_of_inspection = new Date(data.date_of_inspection);
				data.date_of_loss = new Date(data.date_of_loss);
			};

			/**
			 * [function description]
			 * @return {[type]} [description]
			 */
			var setAdjuster = function() {
				$scope.inspection.adjuster = $scope.adjusters.filter(function(adjuster) {
					return adjuster.id === $scope.inspection.adjuster.id;
				})[0];
			};
			
			InspectionService.getInspectionTypes(function(data) {
				$scope.inspectionTypes = data.types;
				if ($scope.inspection.inspection_type) {
					setInspectionType();	
				}	
			}, function(err) {
				console.log(err);
			});

			// Pass id, if a new work order id will be falsy
			$scope.hasInspection = $routeParams.id;
			$scope.states = formFactory.getStates();

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

			if ($routeParams.id) {
				angular.element('.content-wrapper').removeClass('no-margin-left');
				$scope.options = shared.getInspectionSideBar($routeParams.id);
			
				// set state property
				$scope.states.forEach(function(state) {
					if (state.name === $scope.inspection.state) {
						$scope.state = state;	
					}
				});
			} else {
				// Hide the side bar
				angular.element('.content-wrapper').addClass('no-margin-left');
			}
			
			/**
			 * [function description]
			 * @param  {[type]} redirect [description]
			 * @return {[type]}          [description]
			 */
			$scope.save = function(redirect) {

				// In case inspection_val exists
				delete $scope.inspection.inspection_val;

				// Angular will use the object and we only need the id
				var inspection = angular.copy($scope.inspection);
				inspection.inspection_type = inspection.inspection_type.id;
				inspection.date_received = new Date(inspection.date_received).getTime();
				inspection.date_of_loss = new Date(inspection.date_of_loss).getTime();
				
				function getDate() {
					inspection.requested_date_of_inspection = new Date(inspection.requested_date_of_inspection);
					return getMonth() + '/' + getDay() + '/' + inspection.requested_date_of_inspection.getFullYear();
				}
				
				function getMonth() {
					var month = inspection.requested_date_of_inspection.getMonth() + 1;
					return month > 9 ? month.toString() : '0' + month;
				}
				
				function getDay() {
					var day = inspection.requested_date_of_inspection.getDate();
					return day > 9 ? day.toString() : '0' + day;
				}
				
				inspection.requested_date_of_inspection = new Date(getDate() + ' ' + $scope.time).getTime();

				InspectionService.create(inspection).$promise.then(function(data) {

					setStringToDate(data);
					$scope.inspection = data;

					// Set form details
					setInspectionType();
					setAdjuster();

					var role = UserFactory.user.get().appRole;

					switch (redirect) {
						case 'new':
							$location.url('/' + role + '/inspections/new');
							break;
						case 'reports':
							$location.path('/' + role + '/reports/' + decodeURIComponent(REPORTS[data.status_id].toLowerCase().replace(' ', '-').replace('_', '-')));
							break;
						default:
							$location.path('/' + role + '/inspections/' + data.id);
							break;
					}

					$scope.alerts = alert.add({
						title: 'Saved',
						content: 'Saved',
						type: 'success'
					}, 3000);

					$timeout(function() {
						$scope.$apply();
					});

				}, function(err) {
					window.console && console.log(err);
				});
			};

			/**
			 * [function description]
			 * @return {[type]} [description]
			 */
			$scope.showModal = function() {
				var modal = $modal({
					scope: $scope,
					title: 'title',
					content: 'content',
					show: true,
					animation: 'am-fade-and-scale',
					templateUrl: 'src/app/inspections/partials/create-client-modal.html'
				});
			};
		}
	])

	.controller('modalCtrl', ['$scope', function($scope) {
		$scope.title = 'andrew';
	}]);

}(angular));
