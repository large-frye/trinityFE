/* global angular */

(function (angular) {
	angular.module('trinity.inspections.controllers.inspect', [])

		.controller('inspectionsCtrl', ['$scope', 'UserService', 'InspectionService', '$modal', '$routeParams',
			'inspection', '$location', 'REPORTS', '$timeout', '$window', 'shared', 'UserFactory', 'alert', '$dateParser',
			'formFactory', 'WorkorderNoteService', 'FORM',
			function ($scope, UserService, InspectionService, $modal, $routeParams,
				inspection, $location, REPORTS, $timeout, $window, shared, UserFactory, alert, $dateParser, formFactory
				, WorkorderNoteService, FORM) {

				if (!$routeParams.id) {
					$window.scrollTo(0, 0);
					$scope.newInspection = true;
				}


				$scope.inspection = inspection.order;

				/**
				 * [function description]
				 * @return {[type]} [description]
				 */
				var setInspectionType = function () {
					$scope.inspection.inspection_type = $scope.inspectionTypes.filter(function (type) {
						return type.id == $scope.inspection.inspection_type;
					})[0];
				};

				/**
				 * [function description]
				 * @param  {[type]} data [description]
				 * @return {[type]}      [description]
				 */
				var setStringToDate = function (data) {
					data.date_received = new Date(data.date_received);
					data.date_of_inspection = new Date(data.date_of_inspection);
					data.date_of_loss = new Date(data.date_of_loss);
				};

				/**
				 * [function description]
				 * @return {[type]} [description]
				 */
				var setAdjuster = function () {
					$scope.inspection.adjuster = $scope.adjusters.filter(function (adjuster) {
						return adjuster.id === $scope.inspection.adjuster.id;
					})[0];
				};

				InspectionService.getInspectionTypes(function (data) {
					$scope.inspectionTypes = sortInspectionType(data.types);
					if (typeof $scope.inspection.inspection_type !== 'undefined') {
						setInspectionType();
					}
				}, function (err) {
					console.log(err);
				});

				// Pass id, if a new work order id will be falsy
				$scope.hasInspection = $routeParams.id;
				$scope.states = formFactory.getStates();

				// Adjusters dropdown
				UserService.adjusters(function (data) {
					$scope.adjusters = data.adjusters;

					// Set adjusters
					if ($routeParams.id) {
						setAdjuster();
					}

					// Set inspection id
				}, function (err) {
					window.console && console.log(err);
				});

				if ($routeParams.id) {
					angular.element('.content-wrapper').removeClass('no-margin-left');
					$scope.options = shared.getInspectionSideBar($routeParams.id);

					// set state property
					$scope.states.forEach(function (state) {
						if (state.name === $scope.inspection.state) {
							$scope.state = state;
						}
					});

					// add workorder notes
					WorkorderNoteService.api().getNotes({
						id: $routeParams.id
					}, function (data) {
						$scope.workorderNotes = data.notes;
						$scope.workorderNote = {};
					}, function (err) {
						console.error(err);
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
				$scope.save = function (isClosed) {

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

					// Added for logger service
					inspection.updated_by = UserFactory.user.get().id;

					InspectionService.create(inspection).$promise.then(function (data) {

						setStringToDate(data);
						// $scope.inspection = data;

						// Set form details
						// setInspectionType();
						setAdjuster();

						var role = UserFactory.user.get().appRole;

						if (!isClosed) {
							$location.path('/' + role + '/inspections/' + data.id);
						}

						// Save note if there is one
						if ($scope.workorderNote.text) {
							$scope.saveNote(function() {
								if (isClosed === 'close')
									$window.close();
							});
						} else {
							$scope.alerts = alert.add({
								title: 'Saved',
								content: 'Saved',
								type: 'success'
							}, FORM.SAVE_LENGTH);

							if (isClosed === 'close')
								$window.close();
						}

						$timeout(function () {
							$scope.$apply();
						});

					}, function (err) {
						window.console && console.log(err);
						$scope.alerts = alert.add({
							title: 'Error when trying to save.',
							content: 'Error when saving',
							type: 'danger'
						});
					});
				};

				$scope.saveNote = function (cb) {
					var profile = UserFactory.user.get().profile;
					$scope.workorderNote.workorder_id = $scope.inspection.id;
					$scope.workorderNote.username = profile.first_name + ' ' + profile.last_name;

					WorkorderNoteService.api().saveNote({
						id: $scope.inspection.id
					}, $scope.workorderNote, function (data) {
						$scope.workorderNotes = data.notes;
						$scope.workorderNote = {};
						$scope.alerts = alert.add({
							title: 'Saved',
							content: 'Saved',
							type: 'success'
						}, FORM.SAVE_LENGTH);
					}, function (err) {
						console.error(err);
					});
				};

				/**
				 * [function description]
				 * @return {[type]} [description]
				 */
				$scope.showModal = function () {
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

		.controller('modalCtrl', ['$scope', function ($scope) {
			$scope.title = 'andrew';
		}]);

		function sortInspectionType(types) {
			return [types[2], types[0], types[1]];
		}

} (angular));
