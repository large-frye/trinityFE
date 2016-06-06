/* global angular */

(function() {
    'use strict';

    angular
        .module('trinity.controllers.admin.reports', [])
        .controller('adminReportCtrl', AdminReportController);

    AdminReportController.$inject = ['report', 'shared', '$location'];
    function AdminReportController(report, shared, $location) {
        var vm = this;
        
        vm.report = report;
        vm.options = shared.getReportSideBar();
        vm.findInspection = findInspection;

        activate();

        ////////////////

        function activate() { }
        
        function findInspection(id) {
            $location.url(encodeURIComponent('/admin/inspections/processing/' + id));
        }
    }
})();