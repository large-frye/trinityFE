(function() {
'use strict';

    angular
        .module('trinity.reports.controller.inspector', [])
        .controller('inspectorReportCtrl', InspectorReportController);

    InspectorReportController.$inject = ['items', 'shared', '$location'];
    function InspectorReportController(items, shared, $location) {
        var vm = this;
        vm.report = items;
        vm.options = shared.getReportInspectorSidebar();
        vm.findInspection = findInspection;

        activate();

        ////////////////

        function activate() { }
        
        function findInspection(id) {
            $location.path('/inspector/inspections/' + id);
        }
    }
})();