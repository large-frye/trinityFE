/* global angular */

(function () {
    'use strict';

    angular
        .module('trinity.controllers.admin.reports', [])
        .controller('adminReportCtrl', AdminReportController);

    AdminReportController.$inject = ['report', 'shared', '$location', '$timeout', 'reportService', '$routeParams'];
    function AdminReportController(report, shared, $location, $timeout, reportService, $routeParams) {
        var vm = this;

        vm.report = report;
        vm.options = shared.getReportSideBar();
        vm.findInspection = findInspection;
        vm.exportToExcel = exportToExcel;

        $timeout(function () {
            var table = $('#example1').DataTable({
                'paging': true,
                'lengthChange': true,
                'lengthMenu': [20, 50, 100],
                'ordering': true,
                'info': true,
                'autoWidth': false,
                'pageLength': 20
            });

            $('#searchReports').on('keyup', function (e) {
                table.search($(this).val()).draw();
            });

            // Minor bug fix for lengthChange
            $('.dataTables_length').parent().css({
                position: 'absolute',
                right: '20px',
                top: '50px'
            });

        }, 10);

        activate();

        ////////////////

        function activate() { }

        function findInspection(id) {
            $location.url(encodeURIComponent('/admin/inspections/processing/' + id));
        }

        function exportToExcel() {
            var type = null;
            if ($routeParams.filter)
                type = $routeParams.filter;
            return reportService.excel({
                sub: type
            }, function (d) {
                var $anchor = document.createElement('a');
                $anchor.setAttribute('href', d.file);
                $anchor.click();
            },
                function (err) {
                    console.log(err);
                });
        }
    }
})();