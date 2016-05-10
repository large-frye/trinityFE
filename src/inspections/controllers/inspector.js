/**
 * Created by andrewfrye on 4/19/16.
 */
/**
 * Created by andrewfrye on 4/11/16.
 */
(function() {
    angular.module('trinity.inspections.controller.inspector', [])

        .controller('inspector.inspectionsCtrl', ['$scope', 'inspection', 'shared', '$route', '$routeParams', 'UserService',
            '$window', 'InspectionService', 'UserFactory', '$location', 'alert', '$timeout',
            function($scope, inspection, shared, $route, $routeParams, UserService, $window, InspectionService,
                UserFactory, $location, alert, $timeout) {
                $scope.id = $route.current.params.id;

                if ($scope.id) {
                    $scope.options = shared.getInspectorInspectionBar();
                }

                if (!$routeParams.id) $window.scrollTo(0, 0);

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
                        if ($scope.inspection.adjuster || $scope.inspection.adjuster_id) {
                            return adjuster.id === $scope.inspection.adjuster_id;
                        }
                    })[0];
                };

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

                // Pass id, if a new work order id will be falsy
                $scope.hasInspection = $routeParams.id;

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

                $scope.inspection = inspection;
                $scope.options = shared.getInspectorInspectionBar($routeParams.id);

                if ($routeParams.id) {
                    setInspectionType();
                }

                $scope.setTime = function() {
                    console.log($scope);
                };

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

                    // Always will be set to NEW_PICKUP and set the inspector_id;
                    if (!inspection.id) {
                        inspection.status_id = 7;
                        inspection.inspector_id = UserFactory.user.get().id;
                    }

                    InspectionService.create({
                        type: 'inspector'
                    }, inspection).$promise.then(function(data) {

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

            }]);
}());