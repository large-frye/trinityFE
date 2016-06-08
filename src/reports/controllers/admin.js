/* global angular */

(function () {
    'use strict';

    angular
        .module('trinity.controllers.admin.reports', [])
        .controller('adminReportCtrl', AdminReportController);

    AdminReportController.$inject = ['report', 'shared', '$location', '$timeout'];
    function AdminReportController(report, shared, $location, $timeout) {
        var vm = this;

        vm.report = report;
        vm.options = shared.getReportSideBar();
        vm.findInspection = findInspection;

        $timeout(function () {
            var table = $('#example1').DataTable({
                'paging': true,
                'lengthChange': false,
                'ordering': true,
                'info': true,
                'autoWidth': false,
                'pageLength': 20
            });

            $('#searchReports').on('keyup', function(e) {
                table.search($(this).val()).draw();
            });

        }, 10);

        activate();

        ////////////////

        function activate() { }

        function findInspection(id) {
            $location.url(encodeURIComponent('/admin/inspections/processing/' + id));
        }
    }
})();