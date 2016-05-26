/**
 * Created by andrewfrye on 4/19/16.
 */
/**
 * Created by andrewfrye on 4/11/16.
 */
(function() {
    angular
        .module('trinity.inspections.controller.inspector', [])
        .controller('inspector.inspectionsCtrl', InspectionsController);
        
    InspectionsController.$inject =  ['$scope', 'inspection', 'shared', '$route', '$routeParams', 'UserService',
    '$window', 'InspectionService', 'UserFactory', '$location', 'alert', '$timeout', '$log', 'REPORTS', '$modal'];
    function InspectionsController($scope, inspection, shared, $route, $routeParams, UserService, $window, InspectionService,
        UserFactory, $location, alert, $timeout, $log, REPORTS, $modal) {
        var vm = this;
        vm.id = $route.current.params.id;
        vm.inspectionTypes = [{ id: 0, name: 'Basic' }, { id: 1, name: 'Expert' }, { id: 2, name: 'Ladder Assist' }];
        vm.hasInspection = $routeParams.id;
        vm.inspection = inspection;
        vm.options = $routeParams.id ? shared.getInspectorInspectionBar($routeParams.id) : null;
        vm.save = save;
        vm.showModal = showModal;

        if (!$routeParams.id) $window.scrollTo(0, 0);
        
        function activate() {
            getAdjusters();
            if ($routeParams.id) {
                setInspectionType();
            }
        }
        
        activate();

        /**
         * [function description]
         * @return {[type]} [description]
         */
        function setInspectionType() {
            vm.inspection.inspection_type = vm.inspectionTypes.filter(function(type) {
                return type.id == vm.inspection.inspection_type;
            })[0];
        }

        /**
         * [function description]
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        function setStringToDate(data) {
            data.date_received = new Date(data.date_received);
            data.date_of_inspection = new Date(data.date_of_inspection);
            data.date_of_loss = new Date(data.date_of_loss);
        }

        /**
         * [function description]
         * @return {[type]} [description]
         */
        function setAdjuster() {
            vm.inspection.adjuster = vm.adjusters.filter(function(adjuster) {
                if (vm.inspection.adjuster || vm.inspection.adjuster_id) {
                    return adjuster.id === vm.inspection.adjuster_id;
                }
            })[0];
        }
        
        function getAdjusters() {
            return UserService.adjusters(function(data) {
                vm.adjusters = data.adjusters;

                // Set adjusters
                if ($routeParams.id) {
                    setAdjuster();
                }

                // Set inspection id
            }, function(err) {
                $log.error(err);
            });
        }

        /**
         * [function description]
         * @param  {[type]} redirect [description]
         * @return {[type]}          [description]
         */
        function save(redirect) {

            // In case inspection_val exists
            delete vm.inspection.inspection_val;

            // Angular will use the object and we only need the id
            var inspection = angular.copy(vm.inspection);
            inspection.inspection_type = inspection.inspection_type.id;
            inspection.date_of_inspection = new Date(inspection.date_of_inspection).getTime();

            // Always will be set to NEW_PICKUP and set the inspector_id;
            if (!inspection.id) {
                inspection.status_id = 7;
                inspection.inspector_id = UserFactory.user.get().id;
            }

            InspectionService.create({
                type: 'inspector'
            }, inspection).$promise.then(function(data) {

                setStringToDate(data);
                vm.inspection = data;

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

                vm.alerts = alert.add({
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
        }

        /**
         * [function description]
         * @return {[type]} [description]
         */
        function showModal() {
            $modal({
                scope: $scope,
                title: 'title',
                content: 'content',
                show: true,
                animation: 'am-fade-and-scale',
                templateUrl: 'src/app/inspections/partials/create-client-modal.html'
            });
        }
    }
}());