/**
 * Created by andrewfrye on 4/11/16.
 */
(function() {
    angular.module('trinity.reports.controller.inspector', [])

        .controller('inspector.reportsCtrl', ['$scope', 'items', 'shared',
            function($scope, items, shared) {
            $scope.report = items;
            $scope.options = shared.getReportInspectorSidebar();
        }]);
}());